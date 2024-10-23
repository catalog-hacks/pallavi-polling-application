
use std::time::Duration;

use crate::{db_operations_repo::{poll_repo::{PollRepo, RepoError}, user_passkey_repo::UserRepo}, session, startup::UserData};
use actix_session::Session;
use actix_web::{web::{self, Data}, Error, HttpResponse};

use serde::{Deserialize, Serialize};
use tokio::{sync::Mutex, time::timeout};
use uuid::Uuid;
use webauthn_rs::prelude::PasskeyAuthentication;

#[derive(Serialize,Deserialize)]
pub struct CreatePollRequest {
    title: String,
    creator: String,
    options: Vec<String>,
}

pub async fn create_poll(
    webauthn_users: Data<Mutex<UserData>>,
    req: web::Json<CreatePollRequest>,
) -> Result<HttpResponse,Error> {
    println!("entereed create_poll");
    let user_repo = UserRepo {client: &webauthn_users.lock().await.client };
    let user_id_result = timeout(Duration::from_secs(5), user_repo.find_unique_id_by_username(&req.creator))
        .await
        .map_err(|_| actix_web::error::ErrorInternalServerError("Timeout while fetching user"))?.unwrap();

    // Match the result to handle Option
    let id = match user_id_result {
        Some(id) => id,
        None => {
            return Err(actix_web::error::ErrorUnauthorized("User not authenticated"));
        }
    };
    print!("id:  {:?}",id);

    let repo = PollRepo { client: user_repo.client };
    println!("starting inserting poll");
    match repo.insert_poll(&req.title, id, &req.options).await {
        Ok(poll_id) => {
            println!("preparing the HttpResponse in json format");
            Ok(HttpResponse::Created().json(poll_id))
        },
        Err(_) => {
            Err(actix_web::error::ErrorInternalServerError(RepoError::DatabaseQueryError))
        }
    }
}
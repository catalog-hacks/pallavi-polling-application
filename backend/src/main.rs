use actix_cors::Cors;
use actix_session::{Session, SessionMiddleware};
use actix_web::{dev::Service,cookie::{Key, SameSite}, http, middleware::{self, Logger}, web, App, Error, HttpResponse, HttpServer};
use db_operations_repo::poll_repo::{self, PollRepo};
use handlers::{handlers::{finish_authentication, register_finish, register_start, start_authentication}, polls_handlers::create_poll};
use log::info;
use session::MemorySession;
use startup::startup;
mod db;
mod db_operations_repo;
mod startup;
mod handlers;
mod session;
mod web_socket_handlers;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let (webauthn, webauthn_users) = startup().await;

    
    info!("Listening on: http://127.0.0.1:5500");
    let key = Key::generate();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000") 
            .allowed_methods(vec!["GET", "POST", "OPTIONS"]) 
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT, http::header::CONTENT_TYPE])
            .allow_any_header() 
            .supports_credentials();


        App::new()
        .wrap(middleware::Logger::default())
        .wrap(
            SessionMiddleware::builder(MemorySession, key.clone())
            
                .cookie_name("webauthnrs".to_string())
                .cookie_http_only(true)
                .cookie_same_site(SameSite::Lax)
                .cookie_secure(false)
                .build(),
        )
        .wrap(cors)
            .app_data(webauthn.clone())
            .app_data(webauthn_users.clone()) 
            .route("/register/start/{username}", web::post().to(register_start))
            .route("/register/finish", web::post().to(register_finish))
            .route("/login/start/{username}", web::post().to(start_authentication))
            .route("/login/finish",web::post().to(finish_authentication))
            .route("/poll/new", web::post().to(create_poll))
            // .route("/ws", web::get().to(websocket_handler))
        
    })
    .bind("127.0.0.1:5500")?
    .run()
    .await
}

WebAuthn workflow : 
-  browser initiates registeration by sending request to site.
-   site sends challenge to browser to ensure authenticity of registeration process.
-   user interaction with browser , allowing user to select authenticator
-   authenticator generates public key and send it back to browser
-  browser sends public key and othere registeration options to site
-  site verifies the authenticity of public key and ensure the challenge was correctly signed 
-  site stores the public key and associated credentials in db for future logins.

explored webauthn-rs crate: 
methods to be used for registeration and login process:  
- start_passkey_registeration()
- finish_passkey_registeration()
-  start_passkey_authentication()
- finish_passkey_authentication()


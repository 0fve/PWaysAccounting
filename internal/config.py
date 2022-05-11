from fastapi.middleware.cors import CORSMiddleware


# CORS Configrution 
origins = ["*"]
allow_origins=origins
allow_credentials=True
allow_methods=["*"]
allow_headers=["*"]


# Database config
SQL_SERVER = "pepsi.database.windows.net"
database_name = "PWaysNodeJSTest"
username = "NodeJSUser"
password = "TestNodeJs334"
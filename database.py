import time
from colorama import Fore
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine import create_engine
from internal.config import username, password, SQL_SERVER, database_name

try:

    connection_string = f'mssql://{username}:{password}@{SQL_SERVER}/{database_name}?driver=ODBC+Driver+17+for+SQL+Server'

    engine = create_engine(connection_string, pool_pre_ping=True)

    connection = engine.raw_connection()

    print(f"{Fore.CYAN}DB{Fore.RESET}:       Database Connected.                                            ")

    SessionLocal = sessionmaker(autocommit=True, autoflush=False, bind=engine)

    Base = declarative_base()


except Exception as e:
    print(f"{Fore.RED}DB{Fore.RESET}:        Couldn't connect to Database.", e)

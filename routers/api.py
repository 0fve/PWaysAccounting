from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import JSONResponse

# # # # # # # # # #   SQL   # # # # # # # # # #
from sqlalchemy import text
from sqlalchemy.exc import ProgrammingError

# # # # # # # # # #  Files  # # # # # # # # # #
from dependencies import get_db


class UnknownError(Exception):
    def __init__(self, message: str, error: str) -> None:

        self.message = message
        self.error = error

    def __str__(self) -> str:
        return f"{self.message} {self.error}"


router = APIRouter(prefix="/api/accounting")


@router.get("/CostCenter/{index}")
async def forms(request: Request, index: str, db=Depends(get_db)):
    try:

        results = db.execute(
            text(f"EXEC AcctsCostCentersGetV001 {index}")).fetchall()

        data = {
            "id": results[0][0],
            "ArDescription": results[0][1],
            "EngDescription": results[0][2],
        }

    except IndexError:
        raise HTTPException(status_code=404, detail="Not found")

    except ProgrammingError:
        raise HTTPException(status_code=400, detail="Invalid Entry")

    except Exception as e:
        raise UnknownError(
            "unknown error caused by CostCenter API request handler", error=e)

    return JSONResponse(data)


@router.get("/create/CostCenter/")
async def forms(request: Request, db=Depends(get_db)):
    try:

        results = db.execute(text(f"EXEC AcctsCostCentersAddV001 'Test','Test' "))


    except IndexError:
        raise HTTPException(status_code=404, detail="Not found")

    except ProgrammingError as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid Entry")

    except Exception as e:
        print(e)
        return UnknownError(
            "unknown error caused by CostCenter API request handler", error=e)

    return JSONResponse("results")



"""
Declare @ErrMsg  nvarchar(100)
Exec AcctsCostCentersAddV001 'تجربة', 'Test', @ErrMsg Output
Print @ErrMsg

"""



"""

CREATE Proc [dbo].[AcctsCostCentersAddV001] 
@ArDescription nvarchar(100), @EngDescription varchar(100), @ErrMsg nvarchar(100) Output

As

Insert Into AcctsCostCenters (ArDescription, EngDescription) Values(@ArDescription, @EngDescription)

Set @ErrMsg = 'Test'

GO

"""
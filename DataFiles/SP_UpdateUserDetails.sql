drop PROCEDURE if exists SP_UpdateUserDetails
go
-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SP_UpdateUserDetails
    @userName varchar(30),
    @firstName varchar(30),
    @lastName varchar(30),
    @email varchar(50),
    @userPassword varchar(50),
    @phone varchar(30)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    --SET NOCOUNT ON;

    -- Update the user details in the MusicUsers table
    UPDATE MusicUsers
    SET
        firstName = @firstName,
        lastName = @lastName,
        email = @email,
        userPassword = @userPassword,
        phone = @phone
    WHERE
        userName = @userName;
END
GO

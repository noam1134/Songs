using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Reflection.Metadata.Ecma335;
using MusicProjectServer.Models;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();
        string cStr = configuration.GetConnectionString("myProjDB");
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Registers a User to the Users table 
    //--------------------------------------------------------------------------------------------------
    public bool Register(MusicUser user)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@firstName", user.FirstName);
        paramDic.Add("@lastname", user.LastName);
        paramDic.Add("@email", user.Email);
        paramDic.Add("@userPassword", user.Password);
        paramDic.Add("@phone", user.Phone);

        cmd = CreateCommandWithStoredProcedure("signUp_SP", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            if (numEffected == 0)
            {
                return false;
            }
            return true;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method Log in by user mail, password
    //--------------------------------------------------------------------------------------------------
    public MusicUser LogInByEmailAndPassword(string emailToLogin, string passwordToLogin)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@email", emailToLogin);
        paramDic.Add("@userPassword", passwordToLogin);

        cmd = CreateCommandWithStoredProcedure("logIn_SP", con, paramDic);// create the command

        MusicUser user = new MusicUser();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                user.Id = Convert.ToInt32(dataReader["Id"]);
                user.FirstName = dataReader["firstName"].ToString();
                user.LastName = dataReader["lastName"].ToString();
                user.Email = dataReader["email"].ToString();
                user.Password = dataReader["userPassword"].ToString();
                user.Phone = dataReader["phone"].ToString();
            }

            return user;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method Add Song to DB
    //--------------------------------------------------------------------------------------------------
    public bool AddSong(Song sng)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@songName", sng.SongName);
        paramDic.Add("@lyrics", sng.Lyrics);
        paramDic.Add("@link", sng.Link);
        paramDic.Add("@artistId", sng.ArtistId);

        cmd = CreateCommandWithStoredProcedure("SPAddSong", con, paramDic);// create the command

        int numEffected = cmd.ExecuteNonQuery(); // execute the command
        if (numEffected == 0)
        {
            throw new Exception("Please make sure song name and Artist Id exist.");
        }
        try
        {
            return true;
        }
        catch
        {
            return false;
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method Add Artist to DB
    //--------------------------------------------------------------------------------------------------
    public bool AddArtist(ArtistClass art)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@artistName", art.Name);
        paramDic.Add("@popularity", art.Popularity);

        cmd = CreateCommandWithStoredProcedure("SPAddArtist", con, paramDic);// create the command

        int numEffected = cmd.ExecuteNonQuery(); // execute the command
        if (numEffected == 0)
        {
            throw new Exception("Please make all parameters valid!");
        }
        try
        {
            return true;
        }
        catch
        {
            return false;
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con, Dictionary<string, object> paramDic)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        if(paramDic != null)
            foreach (KeyValuePair<string, object> param in paramDic) {
                cmd.Parameters.AddWithValue(param.Key,param.Value);

            }


        return cmd;
    }



}

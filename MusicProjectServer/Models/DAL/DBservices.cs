using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using AirBnbProj.Models;
using System.Reflection.Metadata.Ecma335;

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
    // This method update a User to the user table 
    //--------------------------------------------------------------------------------------------------
    public bool UpdateUser(AirBnbUser user)
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
        paramDic.Add("@user_id", user.Id);
        paramDic.Add("@country", user.Country);
        paramDic.Add("@email", user.Email);
        paramDic.Add("@password", user.Password);
        paramDic.Add("@phoneNumber", user.PhoneNumber);



        cmd = CreateCommandWithStoredProcedure("SP_UpdateUser", con, paramDic);// create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            if (numEffected == 0)
            {
                throw new Exception("Could'nt change user details...");
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
    // This method Read Orders By User Id
    //--------------------------------------------------------------------------------------------------
    public List<Order> ReadOrdersByUserId(int user_id)
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
        paramDic.Add("@user_id", user_id);

        cmd = CreateCommandWithStoredProcedure("SP_ReadOrdersByUserId", con, paramDic);// create the command

        List<Order> ordersList = new List<Order>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Order ord = new Order();
                ord.Id = Convert.ToInt32(dataReader["id"]);
                ord.UserId = Convert.ToInt32(dataReader["user_id"]);
                ord.FlatId = Convert.ToInt32(dataReader["flat_id"]);
                ord.StartDate = Convert.ToDateTime(dataReader["startDate"]);
                ord.EndDate = Convert.ToDateTime(dataReader["endDate"].ToString());
                ordersList.Add(ord);
            }
            return ordersList;
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
    // This method Inserts a Order to the Orders table 
    //--------------------------------------------------------------------------------------------------
    public bool InsertOrder(Order ord)
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
        paramDic.Add("@user_id", ord.UserId);
        paramDic.Add("@flat_id", ord.FlatId);
        paramDic.Add("@startDate", ord.StartDate);
        paramDic.Add("@endDate", ord.EndDate);

        cmd = CreateCommandWithStoredProcedure("SP_InsertNewOrder", con, paramDic);// create the command

        int numEffected = cmd.ExecuteNonQuery(); // execute the command
        if (numEffected == 0)
        {
            throw new Exception("Please make sure User ID and Flat ID exist.");
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
    // This method Deletes Order By it's Id
    //--------------------------------------------------------------------------------------------------
    public bool DeleteOrderById(int order_id)
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
        paramDic.Add("@order_id", order_id);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteORderById", con, paramDic);             // create the command
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
    // This method Reads all AirBnb Orders
    //--------------------------------------------------------------------------------------------------
    public List<Order> ReadAllOrders()
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

        cmd = CreateCommandWithStoredProcedure("SP_ReadAllOrders", con, null);// create the command

        List<Order> ordersList = new List<Order>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Order ord = new Order();
                ord.Id = Convert.ToInt32(dataReader["Id"]);
                ord.UserId = Convert.ToInt32(dataReader["user_id"]);
                ord.FlatId = Convert.ToInt32(dataReader["flat_id"]);
                ord.StartDate = Convert.ToDateTime(dataReader["startDate"]);
                ord.EndDate = Convert.ToDateTime(dataReader["endDate"].ToString());
                ordersList.Add(ord);
            }
            return ordersList;
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
    // This method Read Order By Id
    //--------------------------------------------------------------------------------------------------
    public Order ReadOrderById(int ordId)
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
        paramDic.Add("@order_id", ordId);

        cmd = CreateCommandWithStoredProcedure("SP_ReadOrderById", con, paramDic);// create the command

        Order ord = new Order();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ord.Id = Convert.ToInt32(dataReader["Id"]);
                ord.UserId = Convert.ToInt32(dataReader["user_id"]);
                ord.FlatId = Convert.ToInt32(dataReader["flat_id"]);
                ord.StartDate = Convert.ToDateTime(dataReader["startDate"]);
                ord.EndDate = Convert.ToDateTime(dataReader["endDate"].ToString());
            }
            if (ord.UserId == 0)
                throw new Exception("Order does not exist...");

            return ord;
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
    // This method Reads all AirBnb Flats
    //--------------------------------------------------------------------------------------------------
    public List<Flat> ReadAllFlats()
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

        cmd = CreateCommandWithStoredProcedure("SP_ReadAllFlats", con, null);// create the command

        List<Flat> flatsList = new List<Flat>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Flat flat = new Flat();
                flat.Id = Convert.ToInt32(dataReader["flat_id"]);
                flat.City = dataReader["city"].ToString();
                flat.Address = dataReader["address"].ToString();
                flat.NumberOfRooms = Convert.ToInt32(dataReader["numberOfRooms"]);
                flat.Price = Convert.ToDouble(dataReader["price"]);
                flat.ImgUrl = dataReader["imgUrl"].ToString();
                flat.ApartmentName = dataReader["apartmentName"].ToString();
                flat.Rating = Convert.ToDouble(dataReader["rating"]);
                flat.Description = dataReader["description"].ToString();
                flatsList.Add(flat);
            }
            return flatsList;
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
    // This method Inserts a Flat to the Flats table 
    //--------------------------------------------------------------------------------------------------
    public bool InsertFlat(Flat flat)
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
        paramDic.Add("@flat_id", flat.Id);
        paramDic.Add("@city", flat.City);
        paramDic.Add("@address", flat.Address);
        paramDic.Add("@numberOfRooms", flat.NumberOfRooms);
        paramDic.Add("@price", flat.Price);
        paramDic.Add("@imgUrl", flat.ImgUrl);
        paramDic.Add("@apartmentName", flat.ApartmentName);
        paramDic.Add("@rating", flat.Rating);
        paramDic.Add("@description", flat.Description);

        cmd = CreateCommandWithStoredProcedure("SP_InsertFlat", con, paramDic);             // create the command

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
    // This method Read Flat By Id
    //--------------------------------------------------------------------------------------------------
    public Flat ReadFlatById(int flatId)
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
        paramDic.Add("@flat_id", flatId);

        cmd = CreateCommandWithStoredProcedure("SP_ReadFlatById", con, paramDic);// create the command

        Flat flat = new Flat();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                flat.Id = Convert.ToInt32(dataReader["flat_id"]);
                flat.City = dataReader["city"].ToString();
                flat.Address = dataReader["address"].ToString();
                flat.NumberOfRooms = Convert.ToInt32(dataReader["numberOfRooms"]);
                flat.Price = Convert.ToDouble(dataReader["price"]);
                flat.ImgUrl = dataReader["imgUrl"].ToString();
                flat.ApartmentName = dataReader["apartmentName"].ToString();
                flat.Rating = Convert.ToDouble(dataReader["rating"]);
                flat.Description = dataReader["description"].ToString();
            }
            if (flat.City == "")
                throw new Exception("Flat does not exist...");

            return flat;
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
    // This method Read Flats By price
    //--------------------------------------------------------------------------------------------------
    public List<Flat> ReadFlatByPrice(double price)
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
        paramDic.Add("@price", price);

        cmd = CreateCommandWithStoredProcedure("SP_ReadFlatsByPrice", con, paramDic);// create the command

        List<Flat> flatsList = new List<Flat>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Flat flat = new Flat();
                flat.Id = Convert.ToInt32(dataReader["flat_id"]);
                flat.City = dataReader["city"].ToString();
                flat.Address = dataReader["address"].ToString();
                flat.NumberOfRooms = Convert.ToInt32(dataReader["numberOfRooms"]);
                flat.Price = Convert.ToDouble(dataReader["price"]);
                flat.ImgUrl = dataReader["imgUrl"].ToString();
                flat.ApartmentName = dataReader["apartmentName"].ToString();
                flat.Rating = Convert.ToDouble(dataReader["rating"]);
                flat.Description = dataReader["description"].ToString();
                flatsList.Add(flat);
            }
            return flatsList;
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
    // This method Read Flat By City And Rating
    //--------------------------------------------------------------------------------------------------
    public List<Flat> ReadFlatByCityAndRating(string city, double rating)
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
        paramDic.Add("@city", city);
        paramDic.Add("@rating", rating);

        cmd = CreateCommandWithStoredProcedure("SP_ReadFlatsByCityAndRating", con, paramDic);// create the command

        List<Flat> flatsList = new List<Flat>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Flat flat = new Flat();
                flat.Id = Convert.ToInt32(dataReader["flat_id"]);
                flat.City = dataReader["city"].ToString();
                flat.Address = dataReader["address"].ToString();
                flat.NumberOfRooms = Convert.ToInt32(dataReader["numberOfRooms"]);
                flat.Price = Convert.ToDouble(dataReader["price"]);
                flat.ImgUrl = dataReader["imgUrl"].ToString();
                flat.ApartmentName = dataReader["apartmentName"].ToString();
                flat.Rating = Convert.ToDouble(dataReader["rating"]);
                flat.Description = dataReader["description"].ToString();
                flatsList.Add(flat);
            }
            return flatsList;
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
    // This method Delete Flat By Id
    //--------------------------------------------------------------------------------------------------
    public bool DeleteFlatById(int flat_id)
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
        paramDic.Add("@flat_id", flat_id);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteFlatById", con, paramDic);             // create the command
        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            if (numEffected == 0)
            {
                throw new Exception("Error: There is no apartment with such an ID number!");

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
    // This method Inserts a AirBnb User to the Users table 
    //--------------------------------------------------------------------------------------------------
    public bool InsertUser(AirBnbUser user)
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
        paramDic.Add("@country", user.Country);
        paramDic.Add("@email", user.Email);
        paramDic.Add("@password", user.Password);
        paramDic.Add("@phoneNumber", user.PhoneNumber);

        cmd = CreateCommandWithStoredProcedure("SP_InsertUser", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            if(numEffected == 0) 
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
    // This method Reads all AirBnb Users
    //--------------------------------------------------------------------------------------------------
    public List<AirBnbUser> ReadAirBnbUsers()
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

        cmd = CreateCommandWithStoredProcedure("SP_ReadAllUsers", con, null);// create the command

        List<AirBnbUser> usersList = new List<AirBnbUser>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                AirBnbUser user = new AirBnbUser();
                user.Id = Convert.ToInt32(dataReader["Id"]);
                user.Country = dataReader["country"].ToString();
                user.Email = dataReader["email"].ToString();
                user.Password = dataReader["password"].ToString();
                user.PhoneNumber = dataReader["phoneNumber"].ToString();
                usersList.Add(user);
            }
            return usersList; 
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
    public AirBnbUser LogInByEmailAndPassword(string emailToLogin, string passwordToLogin)
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
        paramDic.Add("@password", passwordToLogin);

        cmd = CreateCommandWithStoredProcedure("SP_LogInUser", con, paramDic);// create the command

        AirBnbUser user = new AirBnbUser();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                user.Id = Convert.ToInt32(dataReader["Id"]);
                user.Country = dataReader["country"].ToString();
                user.Email = dataReader["email"].ToString();
                user.Password = dataReader["password"].ToString();
                user.PhoneNumber = dataReader["phoneNumber"].ToString();
            }
            if(user.Id==0)
                throw new Exception("User not found- check email/password...");

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
    // This method Delete
    //--------------------------------------------------------------------------------------------------
    public bool DeleteAllUsers()
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

        cmd = CreateCommandWithStoredProcedure("SP_DeleteAllUsers", con, null);             // create the command
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
    // This method Reads all students above a certain age
    // This method uses the return value mechanism
    //--------------------------------------------------------------------------------------------------
    //public List<Student> ReadAboveAge(double age)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("myProjDB"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }


    //    Dictionary<string, object> paramDic = new Dictionary<string, object>();
    //    paramDic.Add("@age", age);
    //    paramDic.Add("@maxAllowedAge", 40);


    //    cmd = CreateCommandWithStoredProcedure("spReadStudentsAboveAge", con, paramDic);             // create the command
    //    var returnParameter = cmd.Parameters.Add("@returnValue", SqlDbType.Int);

    //    returnParameter.Direction = ParameterDirection.ReturnValue;


    //    List<Student> studentList = new List<Student>();

    //    try
    //    {
    //        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

    //        while (dataReader.Read())
    //        {
    //            Student s = new Student();
    //            s.Id = Convert.ToInt32(dataReader["Id"]);
    //            s.Name = dataReader["Name"].ToString();
    //            s.Age = Convert.ToDouble(dataReader["Age"]);
    //            studentList.Add(s);
    //        }



    //        return studentList;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //        // note that the return value appears only after closing the connection
    //        var result = returnParameter.Value;
    //    }

    //}




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

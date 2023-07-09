namespace MusicProjectServer.Models
{
    public class MusicUser
    {
        private int id;
        private DateTime dateOfRegistration;
        private string firstName;
        private string lastName;
        private string email;
        private string password;
        private string phone;

        public MusicUser(int id, string firstName, string lastName, string email, string password, string phone)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            Phone = phone;
        }

        public MusicUser()
        {
            FirstName = "";
            LastName = "";
            Email = "";
            Password = "";
            Phone = "";
        }

        public int Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Phone { get => phone; set => phone = value; }
    }
}

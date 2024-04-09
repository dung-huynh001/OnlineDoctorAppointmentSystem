namespace WebAPI.Models
{
    public class OTP
    {
        private readonly string code;
        private readonly DateTime expiredTime;

        public OTP(string code, DateTime expiredTime)
        {
            this.code = code;
            this.expiredTime = expiredTime;
        }

        public string Code => code;
        public DateTime ExpiredTime => expiredTime;
    }
}

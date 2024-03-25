using WebAPI.Interfaces.IService;
using WebAPI.Models;
using static System.Net.WebRequestMethods;

namespace WebAPI.Services
{
    public class GenerateOtpService : IGenerateOtpService
    {

        private readonly List<string> secretKeys = new List<string>
        {
            "49381189-E95A-487E-B345-AA4102503C6F",
            "22B49F23-1F75-41DA-891F-338330EE08A3",
            "0E5E6E0C-8344-403A-8A02-088D0F4B9549",
            "4A263370-8208-40E5-B52C-02F178FA4292",
            "8A5375D9-178C-449A-B52C-338330EE08A3",
            "0E5E6E0C-8208-449A-AD1F-5F63A5D99E73",
            "FD5375D9-1F75-B52C-AD1F-5F63A5D99E73",
            "9D5375D9-178C-449A-AD1F-338330EE08A3",
            "BE5E6E0C-v-449A-AD1F-5F63A5D99E73",
        };

        

        public Task<OTP> GenerateOtp(string id)
        {
            string secretKey = RandomSecretKey();
            string otpCode = GenerateOtpCode(secretKey + id);
            DateTime expiredTime = DateTime.Now.AddMinutes(3);
            OTP otp = new OTP(otpCode, expiredTime);
            return Task.FromResult(otp);
        }

        private string GenerateOtpCode(string str)
        {
            using (var md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(str);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                string hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

                int startIndex = hash.Length - 6;
                string otpCode = new string(hash.Substring(startIndex).ToArray());

                return otpCode;
            }
        }

        public Task<bool> ValidOtpCode(string id, OTP otp)
        {
            if(otp.ExpiredTime < DateTime.Now)
                return Task.FromResult(false);

            foreach (var secretKey in secretKeys)
            {
                string reRenderOtp = GenerateOtpCode(secretKey + id);
                if(otp.Code == reRenderOtp)
                {
                    return Task.FromResult(true);
                }
            }
            return Task.FromResult(false);
        }

        private string RandomSecretKey()
        {
            Random random = new Random();
            int randomIndex = random.Next(0, secretKeys.Count);
            return secretKeys[randomIndex];
        }
    }
}

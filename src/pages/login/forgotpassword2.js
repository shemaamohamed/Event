import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';  // استيراد useParams لاستخراج التوكن من الرابط

const ForgotPassword2 = () => {
  const { token } = useParams();  // استخراج التوكن من الرابط
  const [email, setEmail] = useState('');  // تخزين البريد الإلكتروني
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // التحقق من تطابق كلمات المرور
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // إرسال الطلب إلى API الخاصة بإعادة تعيين كلمة المرور
      const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
        email: email,           // إرسال البريد الإلكتروني من المستخدم
        password: newPassword,  // كلمة المرور الجديدة
        password_confirmation: confirmPassword,  // تأكيد كلمة المرور
        token: token            // إرسال التوكن المستخرج من الرابط
      });

      // في حال نجاح العملية
      toast.success('Password has been reset successfully!');
    } catch (error) {
      // في حال حدوث خطأ
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password!');
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginTop: '32px' }}>
      <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }} spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <form noValidate autoComplete="off" onSubmit={handlePasswordReset}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", alignItems: "center", color: " #c62828" }}>
                  Reset Password
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  // تحديث قيمة البريد الإلكتروني
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              {/* عرض الأخطاء في حال كانت كلمة المرور غير متطابقة */}
              {error && <Typography color="error">{error}</Typography>}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: " #c62828",
                    color: "#ffffff",
                    width: "100%",
                  }}
                >
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword2;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("两次输入的密码不一致，请重新输入");
      return;
    }

    const data = await (await fetch('http://localhost:3000/register', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'content-type': 'application/json'
      }
    })).json()
    
    if (data.success) {
      alert("注册成功！");
      window.location.href = '/login.html'
    } else {
      alert(data.data);
    }
  });
});


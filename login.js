document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = await (await fetch('http://localhost:3000/login', {
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
      alert("登录成功！");
      localStorage.setItem('user_info', JSON.stringify(data.data))
      window.location.href = '/index.html'
    } else {
      alert(data.data);
    }
  });
});


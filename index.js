window.onload = () => {
  const mUserInfo = JSON.parse(localStorage.getItem('user_info') || '{}')
  if (!mUserInfo.token) {
    user_info.innerHTML = `
      <ul class="">
        <li><a href="./zhuce.html" target="_blank">注册</a></li>
        <li>/</li>
        <li><a href="./login.html">登录</a></li>
      </ul>
    `
  } else {
    user_info.innerHTML = `
      <div>
        <span>欢迎您，${mUserInfo.username}</span>
        <button onclick="localStorage.clear();location.href='/login.html'">退出</button>
      </div>
    `
  }
}
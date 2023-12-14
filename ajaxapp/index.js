function main(){
    fetchUserInfo("takato256")
        // ここではJSONオブジェクトで解決されるPromise
        .then((userInfo) => createView(userInfo))
        // ここではHTML文字列で解決されるPromise
        .then((view) => displayView(view))
        // Promiseチェーンでエラーがあった場合はキャッチされる
        .catch((error) => {
            // Promiseチェーンの中で発生したエラーを受け取る
            console.error(`エラーが発生しました(${error})`);
        });
}

function fetchUserInfo(userId){
    // fetchの返り値のPromiseをreturnする
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                // エラーレスポンスからRejectedなPromiseを作成して返す
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return response.json();
            }
        });
}

function createView(userInfo){
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Reposotories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function escapeSpecialChars(str){
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function displayView(view){
    const result = document.getElementById("result");
    result.innerHTML = view;
}

function escapeHTML(strings, ...values){
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string"){
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}
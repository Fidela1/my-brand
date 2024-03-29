
 try{
    let data = localStorage.getItem("authData");
     let newData = JSON.parse(data);
     console.log("newData",newData)
  if(!newData.token){
     location.href = "login.html";
  }
   }catch(error){
     console.log("err", error)
     location.href = "login.html";
   }
 
   let authJson = localStorage.getItem("authData")
// console.log("json token:---",authJson)
let authObj = JSON.parse(authJson)
// console.log("obj token:---",authObj)
let accessToken =authObj.token
// console.log("token:---",accessToken)
    
 const logout = async  () => {
     localStorage.removeItem('authData')
     location.href = "login.html";
 }
 async function deleteBlog(url = "", blogId) {
    console.log("url:---", url, )
         const response = await fetch(url+blogId, {
           method: "DELETE",
           mode: "cors",
           cache: "no-cache",
           credentials: "same-origin",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Bearer ${accessToken}`
           },
           redirect: "follow",
           referrerPolicy: "no-referrer",
         });
         return response.json();
       }


 const deleteArticle = async  (blogId) => {
    console.log(blogId)
    deleteBlog("https://my-brand-backend-production.up.railway.app/api/v1/blogs/", blogId).then((data) => {
          
    if(data.status === "success"){
      console.log("data:---", data)
      location.href = "admin.html";
    }})
  .catch((err) => {
  
  });
}

const editArticle =  (blogId) => {
    console.log(blogId)

      location.href = `edit.html?id=${blogId}`;
   
}

 
 const getData = async  () => {
     const response = await fetch("https://my-brand-backend-production.up.railway.app/api/v1/blogs")
     const result = await response.json();
     console.log(result)
    let blogArr =result.data.blog;
    console.log("blogArr:-",blogArr);
    const reverseArr=blogArr.reverse()
    const firstBlogs = reverseArr.slice(0, 5);
    console.log("blogArr:-",blogArr);
    const newArr = firstBlogs.map(myFunction);
    document.getElementById("blog-row").innerHTML = newArr;
       
 }
 getData();

function myFunction(blog){
 
  const articles = `
  <tr>
  <td> <img src=${blog.blog_image} alt="4" style="width:80px ;height:80px"></td>
  <td> ${blog.title}</td>
  <td> ${blog.description.substring(0,20)}</td>
  <td><button onclick = deleteArticle('${blog._id}')  id="delete-blog ${blog.title}" > delete</button>
  <button onclick = editArticle('${blog._id}') id = "edit-blog ${blog.title}">edit</button></td>
  </tr>
`
                return articles;
}


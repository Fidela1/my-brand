
const deleteData = (image, title, desc ) => {

  console.log("---here")
  let singleBlog = {};
  

  singleBlog.image = image;
  singleBlog.title = title;
  singleBlog.desc= desc;
  localStorage.setItem("singleBlog",  JSON.stringify(singleBlog));
  console.log("---:", singleBlog)
  window.location.href ="/first-blog.html"

}
const getData = async  () => {
  const response = await fetch("https://my-brand-backend-production.up.railway.app/api/v1/blogs")
  const result = await response.json();
  console.log(result)
 let blogArr =result.data.blog;
 console.log("blogArr:-",blogArr);
 const reverseArr=blogArr.reverse()
 const firstBlogs = reverseArr.slice(0, 4);
 console.log("blogArr:-",blogArr);
 const newArr = firstBlogs.map(myFunction);
 document.getElementById("blog-card").innerHTML = newArr;
    
}
getData();

const singleArticle =  (blogId) => {
  console.log(blogId)

    location.href = `first-blog.html?id=${blogId}`;
 
}


function myFunction(blog) {
  console.log("my",blog.description);
  
  const blogCard = `
  <div class="card">
   <img src=${blog.blog_image} alt="4" style="width:100% ;height:90px">

 
  <h2>${blog.title} </h2>
  <p>${blog.description.substring(0,20)}</p>
  
  <button onclick = singleArticle('${blog._id}') id = "single-blog ${blog.title}" class="see-more">Read more</button>
 
  <div class="signs">
    <div class="comment"><img src="/img/comment.png" alt="commen" style="width:20px ">0</div>
    <div class="like"><img src="/img/like.png" alt="lk" style="width: 20px">0</div>
  </div>
</div>`
  return blogCard;

}

  const workWrapper = document.getElementById("workWrapper");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");

  scrollLeftBtn.addEventListener("click", () => {
    workWrapper.scrollBy({ left: -300, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    workWrapper.scrollBy({ left: 300, behavior: "smooth" });
  });
  document.getElementById("year").textContent = new Date().getFullYear();


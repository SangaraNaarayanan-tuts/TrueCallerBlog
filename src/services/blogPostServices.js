const fetchBlogs = async (page = 1, category = null, noOfPosts = 20) => {
    try {
        let apiUrl = process.env.VUE_APP_BASEURL + `posts/?fields=slug,categories,post_thumbnail,title,date&number=${noOfPosts}&page=${page}`;
        if(category){
            apiUrl += `&category=${category}`
        }
        const response = await fetch(apiUrl);
        let responseJson = await response.json();
        return {
            status: true,
            data: responseJson
        }
    } catch (error) {
        return {
            status: false,
            message: "Error Occured While getting blogs"
        }
    }
}

const fetchSingleBlog = async (slugId) => {
    try {
        const response = await fetch(process.env.VUE_APP_BASEURL + `posts/slug:${slugId}?fields=featured_image,title,author,content,date`);
        let responseJson = await response.json();
        return {
            status: true,
            data: responseJson
        }
    } catch (error) {
        return {
            status: false,
            message: "Error Occured While getting blog details"
        }
    }
}

const fetchAllCategories = async () => {
    try {
        const response = await fetch(process.env.VUE_APP_BASEURL + 'categories');
        let responseJson = await response.json();
        return {
            status: true,
            data: responseJson
        }
    } catch (error) {
        return {
            status: false,
            message: "Error Occured While getting blogs"
        }
    }
}
export default {
    fetchBlogs,
    fetchSingleBlog,
    fetchAllCategories
};
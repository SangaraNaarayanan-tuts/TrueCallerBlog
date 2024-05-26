<template>
  <div>
    <NavBarComponent></NavBarComponent>
    <div class="mainContainer">
      <LoaderComponent v-if="blogsApiProgress"></LoaderComponent>
      <div v-else>
        <div v-if="blogImage">
          <img id="headerImage" :src="blogImage" alt="headerImage" />
        </div>

        <div class="blogTitleContent">
          <div class="blogTitle" v-if="blogTitle">
            <p v-html="blogTitle"></p>
          </div>
          <div class="authorContainer">
            <img v-if="blogAuthorImage" :src="blogAuthorImage" alt="Avatar" class="avatar">
            <div id="authorInfo">
              <div class="athorName" v-if="blogAuthorName"> {{ blogAuthorName }}</div>
              <div class="blogDate" v-if="blogDate"> {{ blogDate }}</div>
            </div>
          </div>
          <div v-if="blogContent" style="">
            <p id="blogContent" v-html="blogContent"></p>
          </div>
        </div>
        <CopyRightFooter></CopyRightFooter>
      </div>
    </div>
    <ErrorPopup v-if="showErrorPopUp" @hidePopup="hidePopup" :errorMessage="errorMessage"></ErrorPopup>
  </div>
</template>

<script>
import * as DOMPurify from 'dompurify';
import NavBarComponent from '../../components/NavBar.vue';
import CopyRightFooter from './components/CopyRightFooter.vue';
import blogPostServices from '../../services/blogPostServices';
import LoaderComponent from '../../components/Loader.vue';
import ErrorPopup from '../../components/ErrorPopup.vue';
export default {
  name: 'BlogDetails',
  components: {
    NavBarComponent,
    LoaderComponent,
    CopyRightFooter,
    ErrorPopup
  },
  data() {
    return {
      blogsApiProgress: false,
      blogImage: null,
      blogTitle: null,
      blogAuthorName: null,
      blogAuthorImage: null,
      blogDate: null,
      blogContent: null,
      showErrorPopUp: false,
      errorMessage: ""
    }
  },
  methods: {
    getBlogDetails: async function (blogslug) {
      try {
        this.blogsApiProgress = true
        const getBlogRes = await blogPostServices.fetchSingleBlog(blogslug);
        if (!getBlogRes.status) {
          this.showErrorPopUp = true;
          this.errorMessage = getBlogRes.message;
          return
        }
        this.blogImage = getBlogRes.data?.featured_image;
        this.blogTitle = getBlogRes.data?.title;
        if ('author' in getBlogRes.data) {
          this.blogAuthorImage = getBlogRes.data.author?.avatar_URL;
          this.blogAuthorName = getBlogRes.data.author?.name;
        }
        this.blogContent = DOMPurify.sanitize(getBlogRes.data?.content);
        this.formatDate(getBlogRes.data?.date);
      } finally {
        this.blogsApiProgress = false;
      }
    },
    formatDate: function (date) {
      let myDate = new Date(date);
      this.blogDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(myDate);
    },
    hidePopup() {
      this.showErrorPopUp = false;
    },
  },
  mounted() {
    const blogSlug = this.$route.params.blogslug;
    if (blogSlug) {
      this.getBlogDetails(blogSlug);
    } else {
      this.showErrorPopUp = true
    }


  }
}
</script>
<style scoped>
.mainContainer {
  width: 100%;
  height: 100vh;
}

a {
  text-decoration: none;
  color: red;
}

#headerImage {
  width: 100%;
  height: 700px;
  object-fit: cover;
}

.blogTitleContent {
  margin: 15px 370px;
}

.blogTitle {
  font-size: 35px;
  text-shadow: 0px 0px 2px #919191;
  font-weight: 600;
  color: #000000;
}

.authorContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;

}

#authorInfo {
  margin-left: 20px;
}

.athorName {
  font-size: 20px;
  font-weight: 600;
}

.blogDate {
  font-size: 20px;
  font-weight: 500;
  color: #919191
}

#blogContent {
  text-align: justify;
  font-weight: 500;
  font-size: 18px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: start;
}

#blogContent>>>a {
  text-decoration: none;
}

@media only screen and (max-width: 600px) {
  #headerImage {
    height: auto;
    object-fit: fill;
    filter: brightness(80%);
  }

  .blogTitle {
    font-size: 20px;
  }

  .blogTitleContent {
    margin: 0px 25px;
  }

  .avatar {
    width: 50px;
    height: 50px;
  }

  #authorInfo {
    margin-left: 10px;
  }

  .athorName {
    font-size: 16px;
  }

  .blogDate {
    margin-top: 5px;
    font-size: 14px;
  }

  #blogContent {
    margin: 10px 0px;
  }

  #blogContent>>>figure {
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: scale-down;
    overflow: hidden;
  }

  #blogContent>>>img {
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: scale-down;
    overflow: hidden;
    object-position: -50% 10%;
  }
}
</style>
<template>
  <div>
    <NavBarComponent></NavBarComponent>
    <img id="headerImage" src="../../assets/images/header.jpg" alt="headerImage" />
    <div class="overlaytext">The Truecaller Blog</div>
    <div class="mainContainer">
      <div class="titleContainer">
        <p class="title"> Lates Article </p>
      </div>
      <section class="dropdownContainer">
        <LoaderComponent v-if="catApiProgress"></LoaderComponent>
        <div v-else class="dropdown">
          <select name="categories" v-model="selectedCategory" id="category" @change="changeCategory">
            <option value="allcategories">All Categories</option>
            <template v-for="(catInfo, catindex) in categoriesList">
              <option :value="catInfo.slug" :key="catindex" > {{  catInfo.name }}</option>
            </template>
            </select>
        </div>
      </section>
      <div class="blogsContainer">
        <LoaderComponent v-if="blogsApiProgress"></LoaderComponent>
        <div v-else>
        <div class="blogsList" v-if="totalCount == 0" >
            No Blogs Found in this category
        </div>
          <div class="blogsList" v-else>
            <template v-for="(blogInfo, blogindex) in blogs">
              <BlogCard :key="blogindex" :BlogInfo=blogInfo></BlogCard>
            </template>
          </div>

        </div>
      </div>
      <div>
        <div class="pagination" v-if="totalCount > 0">
          <button class="pagebutton" @click="changePage(currentPage - 1)"> &lt; </button>
          <template v-if="pagesToDisplay[0] > 1">...</template>
          <template v-for="(pageNo, index) in pagesToDisplay">
            <button class="pagebutton" @click="changePage(pageNo)" :key="index"
              :style="[currentPage == pageNo ? selectedPageStyle : otherPageStyle]"> {{ pageNo }}</button>
          </template>
          <template v-if="pagesToDisplay.at(-1) < totalPageCount">...</template>
          <button class="pagebutton" v-if="!  pagesToDisplay.includes(totalPageCount) " @click=changePage(totalPageCount)> {{
            totalPageCount
            }} </button>
          <button class="pagebutton" @click="changePage(currentPage + 1)"> &gt; </button>
          <div> Total blogs: <span class="pageTotalCount"> {{ totalCount }}</span></div>
        </div>
      </div>
    </div>
    <ErrorPopup v-if="showErrorPopUp" @hidePopup="hidePopup" :errorMessage="errorMessage"></ErrorPopup>
  </div>
</template>

<script>
import blogPostServices from '../../services/blogPostServices';
import BlogCard from './components/BlogCard.vue';
import NavBarComponent from '../../components/NavBar.vue';
import ErrorPopup from '../../components/ErrorPopup.vue';
import LoaderComponent from '../../components/Loader.vue';

export default {
  name: 'HomePage',
  components: {
    LoaderComponent,
    BlogCard,
    NavBarComponent,
    ErrorPopup
  },
  props: {

  },
  data() {
    return {
      blogsApiProgress: false,
      catApiProgress: false,
      totalCount: 0,
      blogs: [],
      totalPageCount: 0,
      currentPage: 1,
      pagesToDisplay: [],
      selectedPageStyle: { 'background-color': '#6495ED', 'color': '#FFFFFF' },
      otherPageStyle: { 'background-color': 'transparent' },
      categoriesList: [],
      selectedCategory: 'allcategories',
      showErrorPopUp: false,
      errorMessage: ""
    }
  },
  methods: {
    getAllBlogs: async function () {
      try {
        this.blogsApiProgress = true;
        const category= this.selectedCategory == 'allcategories' ? null: this.selectedCategory 
        const getBlogsRes = await blogPostServices.fetchBlogs(this.currentPage,category);
        if (!getBlogsRes.status) {
          this.showErrorPopUp = true;
          this.errorMessage = getBlogsRes.message;
          return
        }
        this.totalCount = getBlogsRes.data?.found;
        this.blogs = getBlogsRes.data?.posts;
        this.calcPagesCount();
        this.paginationDisplay(this.currentPage);
      } finally {
        this.blogsApiProgress = false;
      }
    },
    getCategories: async function () {
      try{
        this.catApiProgress = true
        const getBlogRes = await blogPostServices.fetchAllCategories();
        if (!getBlogRes.status) {
          this.showErrorPopUp = true;
          this.errorMessage = getBlogRes.message;
          return
        }
        this.categoriesList = getBlogRes.data?.categories;
      } finally {
        this.catApiProgress = false;
      }
    },
    calcPagesCount: function () {
      if(this.totalCount >= 20) {
        this.totalPageCount = Math.floor(this.totalCount / 20);
      } else{
        this.totalPageCount = 1;
      }
    },
    paginationDisplay: function (selectedPage) {
      let pagination = [];
      pagination.push(selectedPage);
      for (let i = selectedPage - 1; i >= 1 && pagination.length < 5; i--) {
        pagination.unshift(i);
      }
      for (let i = selectedPage + 1; i <= this.totalPageCount && pagination.length < 5; i++) {
        pagination.push(i);
      }
      this.pagesToDisplay = pagination;
    },
    changePage: function (newPage) {
      if (newPage > 0 && newPage <= this.totalPageCount) {
        this.currentPage = newPage;
        this.paginationDisplay(newPage);
        this.getAllBlogs();
      }
    },
    changeCategory: function () {
        this.getAllBlogs()
    },
    hidePopup() {
      this.showErrorPopUp = false;
    },


  },
  mounted() {
    this.getCategories();
    this.getAllBlogs()
  }
}
</script>
<style scoped>
#headerImage {
  width: 100%;
  height: 700px;
  object-fit: cover;
  filter: brightness(80%);
}

.overlaytext {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 50px;
  text-shadow: 0px 0px 2px #919191;
  font-weight: 600;
  text-align: center;
}

.mainContainer {
  display: flex;
  flex-direction: column;
  padding: 0px 100px;
}

.titleContainer {
  margin: 20px 0px;
}

.title {
  color: #050505;
  font-size: 45px;
  padding: 0px;
  margin: 0px;
  font-weight: 600;
}

#category {
  padding: 10px 20px;
}

.blogsContainer {
  min-height: 400px;
  display: flex;
  justify-content: start
}

.blogsList {
  padding: 0px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start
}

.pagination {
  text-align: center;
  margin: 20px 0px;
}

.pagebutton {
  background-color: transparent;
  font-size: 14px;
  color: #000000;
  font-weight: 600;
  margin: 10px 5px;
  border: none;
  padding: 10px;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
}

.pageTotalCount {
  font-size: 14px;
  color: #000000;
  font-weight: 600;
}
@media only screen and (max-width: 600px) {
  #headerImage {
    height: auto;
    object-fit: cover;
    filter: brightness(80%);
  }
  .overlaytext {
    top: 22%;
    left: 50%;
    font-size: 30px;
    width:100%;
  }
  .mainContainer{
    padding: 0px 40px
  }
  .title{
    font-size: 30px;
    font-weight: 600;
  }
  #category {
    width: 100%  
  }
  .blogsList{
    justify-content: center 
  }
  .pagination {
    text-align: center;
    margin: 10px 0px;
  }
  .pagebutton {
    margin: 20px 0px;
    padding: 5px;
  }
}
</style>
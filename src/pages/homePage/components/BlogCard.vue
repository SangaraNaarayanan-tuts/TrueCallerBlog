<template>
	<div class="blogCard" @click="detailsPageRedirect">
		<div class="categoryContainer">
			<div class="categoryColor" :style="{ 'background-color': generatedColor }"></div>
			<p class="categoryName"> {{ Object.keys(BlogInfo.categories)[0] }}</p>
		</div>
		<div class="imageContainer">
			<template v-if="'post_thumbnail' in BlogInfo">
				<img :src="BlogInfo.post_thumbnail.URL" />
			</template>
			<template v-else>
				<div id="noimage"> Image not available</div>
			</template>
		</div>
		<div class="titletimeContainer">
			<div class="titleName">
				<p v-html="sanitizedTitle"></p>
			</div>
			<p class="time"> {{ TimeDiff }} ago </p>
		</div>
	</div>
</template>

<script>
import * as DOMPurify from 'dompurify';
export default {
	name: 'BlogCard',
	props: [
		"BlogInfo"
	],
	data() {
		return {
			generatedColor: '#FF5050',
			TimeDiff: "0 hours",
			sanitizedTitle: ""
		}
	},
	methods: {
		randomColorGen: function () {
			let red = Math.floor(Math.random() * 256);
			let green = Math.floor(Math.random() * 256);
			let blue = Math.floor(Math.random() * 256);
			this.generatedColor = '#' + red.toString(16) + green.toString(16) + blue.toString(16);
		},
		calcTimeDiff: function (timing) {
			const currentTime = new Date();
			const blogTime = new Date(timing);
			const timeDiff = Math.abs(currentTime - blogTime);
			const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
			const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
			const monthsDiff = (currentTime.getFullYear() - blogTime.getFullYear()) * 12 + (currentTime.getMonth() - blogTime.getMonth());
			const yearsDiff = currentTime.getFullYear() - blogTime.getFullYear();
			if (yearsDiff) {
				this.TimeDiff = yearsDiff + ' years'
			} else if (monthsDiff) {
				this.TimeDiff = monthsDiff + ' months'
			} else if (weeksDiff) {
				this.TimeDiff = weeksDiff + ' weeks'
			} else if (daysDiff) {
				this.TimeDiff = daysDiff + ' days'
			} else {
				this.TimeDiff = hoursDiff + ' hours'
			}
		},
		detailsPageRedirect: function () {
			window.scrollTo(0, 0);
			this.$router.push('/blog/' + this.BlogInfo.slug);
		}
	},
	mounted() {
		this.sanitizedTitle = DOMPurify.sanitize(this.BlogInfo?.title);
		this.randomColorGen();
		this.calcTimeDiff(this.BlogInfo.date)
	}
}
</script>

<style scoped>
.blogCard {
	display: flex;
	flex-direction: column;
	box-shadow: 0px 0px 3px #eeeeee;
	background-color: #fff;
	height: 320px;
	max-width: 310px;
	margin: 10px 15px 10px 0px;
	flex: 1 0 33%;

}

.categoryContainer {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 15px 0px 15px 15px;
}

.categoryColor {
	height: 12px;
	width: 12px;
	margin-right: 10px;
	border-radius: 50%;
}

.categoryName {
	margin: 0px;
	font-size: 16px;
	font-weight: 600;
}

.imageContainer img {
	width: 100%;
	height: 150px;
	object-fit: cover;
}

#noimage {
	width: 100%;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

}

.titletimeContainer {
	padding: 0px 24px;
	height: 110px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.titleName {
	margin: 0px;
	font-size: 18px;
	font-weight: 600;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: clip;
}

.time {
	margin-top: 15px;
	font-size: 14px;
	color: #838383;
}

@media only screen and (max-width: 600px) {
	.categoryContainer {
		padding: 20px 0px 20px 15px;
	}

	.blogCard {
		flex: 1 0 100%;
		align-items: starts;
		justify-content: start;
		margin: 10px 0px;
		max-width: 350px;
	}

	.imageContainer img {
		width: 100%;
		object-fit: cover
	}

}
</style>
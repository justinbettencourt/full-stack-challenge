<template>
  <div class="hello">
		<input v-model="name" type="text" placeholder="Name">
		<br><br>
		<div>
			<input type="checkbox" id="checkbox" v-model="isTest">
			<label for="checkbox">isTest ({{ isTest }})</label>
		</div>
		<ul>
			<li v-for="(question, index) in Questions" :key="index.id">
				<p>Question #{{ question.number }} {{ index }}</p>
				<div>
					<p>{{ question.description }}</p>
					<textarea rows="4" cols="50" v-model="question.answer"></textarea>
					<p>{{ question.answer }}</p>
				</div>
			</li>
		</ul>
		<button @click="buttonSave()">Send</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
			name: '',
			isTest: true,
			Questions: {
				number: '',
				description: '',
				answer: ''
			},
			buttonClicked: 0,
    }
	},
	methods: {
		buttonSave: function() {
			this.buttonClicked += 1;
		}
	},
  mounted() {
		//   axios.get('https://api.zomaron.com/v1/coding/test1')
		// Using the API locally (on the web server through express.js) at the moment to get things working first.
    axios.get("http://localhost:3000/")
      .then(response => {
        console.log(response.data);
        this.Questions = response.data;
      })
      .catch(error => {
        console.log(error);
      });
	},
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

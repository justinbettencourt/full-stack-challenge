<template>
<v-app id="app" >
	<li>
		<v-container fluid grid-list-lg>
			<v-layout row wrap>
				<v-flex xs12 >
					<v-card width=50% style="margin: auto">
						<!-- Name Text Box -->
						<input v-model="name" type="text" placeholder="Name">
						<br><br>
						<!-- isTest Checkbox to determine if information is valid -->
						<div>
							<input type="checkbox" id="checkbox" v-model="isTest">
							<label for="checkbox">isTest ({{ isTest }})</label>
						</div>

					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</li>
	<li v-for="(question, index) in Questions" :key="index.id">
		<v-container fluid grid-list-lg>
			<v-layout row wrap>
					<v-flex xs12>
						<v-card width=50% style="margin: auto">
							<p>Question #{{ question.number }}</p>
							<p>{{ question.description }}</p>
							<textarea rows="4" cols="50" v-model="question.answer"></textarea>
						</v-card>
					</v-flex>
			</v-layout>
		</v-container>
	</li>

		<v-btn color="primary">
			<button @click="postToServer()">Send</button>
		</v-btn>	
</v-app>
</template>

<script>
import axios from "axios";
export default {
	name: "HelloWorld",
	data() {
		return {
			name: '',
			isTest: true,
			Questions: {},
		}
	},
	methods: {
		postToServer() {
			// We are going to set the data objects as variables to pass through the POST.
			var name = this.name
			var isTest = this.isTest
			var questions = this.Questions
			
			// When ready to submit, POST the data to the web server. Data will be displayed at /userData
			axios.post('http://localhost:3000/userData', { 
				name,
				isTest,
				questions
			},
			{
				headers: {
					'Content-Type': 'application/json'	
				}
			})
			.then((response) => {
				// response.data = newUser;
				console.log('Sending to POST: ')
				console.log(response.data)
			})
			
		}
	},
  	mounted() {
		//axios.get('https://api.zomaron.com/v1/coding/test1')
		// Using the API locally (on the web server through express.js) at the moment to get things working first.
		axios.get("http://localhost:3000/", {
			headers: {
				'Content-Type': 'application/json'	
			}
		})
		.then(response => {
			// console.log(response.data);
			this.Questions = response.data;
			console.log('GET API data from web server: ')
			console.log(this.Questions);
		})
		.catch(error => {
			console.log(error);
		});
	}
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

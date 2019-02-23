<template>
<v-app id="app" >
	<v-container fluid grid-list-lg class="pa-0">
		<v-layout row wrap >
			<v-flex xs12>
				<!-- 
					Vuetify has different background colours for v-containers and v-lists.

					** Temp fix by nesting the info card into a list and removing the padding around the container. **
				-->
				<v-list>
					<v-card width=75% class="ma-auto elevation-3">
						<v-flex class="ma-3">
							<div class=" mt-3">
								<p class="caption mb-0">Hello,</p>
								<p class="subheading">Please enter your name:</p>
							</div>
					
							<v-text-field
								v-model="firstName"
								label="First Name"
								box
							></v-text-field>
							<v-text-field
								v-model="lastName"
								label="Last Name"
								box
							></v-text-field>
							<v-checkbox v-model="isTest" :label="'isTest'"></v-checkbox>
						</v-flex>
					</v-card>
				</v-list>
				<v-list v-for="(question, index) in Questions" :key="index.id">
					<v-card width=75% class="ma-auto elevation-3">
						<v-flex class="ma-3">
							<div class=" mt-3">
								<p class="caption mb-0">Question #{{ question.number }}</p>
								<p class="subheading">{{ question.description }}</p>
							</div>
							<v-textarea box label='Answer' v-model="question.answer"></v-textarea>
						</v-flex>
					</v-card>
				</v-list>
				<v-list class="text-xs-center">
					<v-btn  class="elevation-3" color="primary" @click="postToServer()">Send</v-btn>
				</v-list>
			</v-flex>
		</v-layout>
	</v-container>
	
</v-app>
</template>

<script>
import axios from "axios";
export default {
	name: "HelloWorld",
	data() {
		return {
			firstName: '',
			lastName: '',
			isTest: true,
			Questions: {},
		}
	},
	methods: {
		postToServer() {
			// We are going to set the data objects as variables to pass through the POST.
			var name = this.firstName + ' ' + this.lastName
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

</style>

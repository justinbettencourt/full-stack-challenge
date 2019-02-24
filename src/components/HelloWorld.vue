<template>
	<v-app id="app" >
		<v-container fluid grid-list-lg class="pa-0">
			<v-layout row wrap >
				<v-flex xs12>
					<v-list>
						<v-card width=65% class="ma-auto elevation-3">
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
						<v-card width=65% class="ma-auto elevation-3">
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
			// Setting the data objects as variables to pass through the POST.
			// When ready to submit, POST the data to the web server. Data will be written to /userData
			axios.post('http://localhost:3000/userData', { 
				name: this.firstName + ' ' + this.lastName,
				isTest: this.isTest, 
				questions: this.Questions
			})
			.then((response) => {
				console.log('Sending to POST')
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
  	mounted() {
		// Pulling the API information from the Web Server.
		axios.get("http://localhost:3000/", {
			headers: {
				'Content-Type': 'application/json'	
			}
		})
		.then(response => {
			// Assign the response data to the Questions data object.
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
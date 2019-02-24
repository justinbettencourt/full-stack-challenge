<template>
	<v-app id="app" >
		<v-container>
			<v-layout align-center justify-center>
				<v-flex s12 md4>
					<v-list class="pa-0">
						<v-card class="ma-auto elevation-3">
							<v-flex class="ma-4">
								<div class=" pt-4">
									<p class="caption mb-0">Hello,</p>
									<p class="subheading mb-0">Please enter your name:</p>
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
								<v-checkbox class="mt-0 pt-0" v-model="isTest" :label="'isTest'"></v-checkbox>
							</v-flex>
						</v-card>
					</v-list>
					<v-list v-for="(question, index) in Questions" :key="index.id" class="pa-0">
						<v-card class="ma-auto elevation-3">
							<v-flex class="ma-4">
								<div class=" pt-4">
									<p class="caption mb-0">Question #{{ question.number }}</p>
									<p class="subheading mb-0">{{ question.description }}</p>
								</div>
								<v-textarea box label='Answer here...' v-model="question.answer"></v-textarea>
							</v-flex>
						</v-card>
					</v-list>
					<v-layout align-center justify-center>
						<v-btn class="elevation-3" color="primary" @click="postToServer()">Send</v-btn>
					</v-layout>
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
			// Setting the data objects to pass through the POST.
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
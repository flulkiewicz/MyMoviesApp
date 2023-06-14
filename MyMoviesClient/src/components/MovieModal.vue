<template>
	<Transition name="modal">
		<div v-if="show" class="modal-mask">
			<div class="modal-container">
				<div class="modal-header">
					<slot name="header"></slot>
				</div>

				<div class="modal-body text-white">
					<form>
						<div class="form-group">
							<label for="title">Tytuł: </label>
							<input type="text" class="form-control m-1" id="title" v-model="movie.title" />
							<small class="mx-3 mb-4 d-block">
								<span v-for="error of v$.movie.title.$errors" :key="error.$uid" class="validation-error-text">
									<strong>{{ error.$message }}</strong>
								</span>
							</small>
						</div>
						<div class="form-group">
							<label for="director">Reżyser:</label>
							<input type="text" class="form-control m-2" id="director" v-model="movie.director" />
							<small class="mx-3 mb-4 d-block">
								<span v-for="error of v$.movie.director.$errors" :key="error.$uid" class="validation-error-text">
									<strong>{{ error.$message }}</strong>
								</span>
							</small>
						</div>
						<div class="form-row">
							<div class="form-group">
								<label for="year">Rok wydania:</label>
								<input type="number" class="form-control m-2" id="year" v-model="movie.year" />
								<small class="mx-3 mb-4 d-block">
									<span v-for="error of v$.movie.year.$errors" :key="error.$uid" class="validation-error-text">
										<strong>{{ error.$message }}</strong>
									</span>
								</small>
							</div>
							<div class="form-group">
								<label for="rate">Ocena:</label>
								<input type="number" class="form-control m-2" id="rate" v-model="movie.rate" />
								<small class="mx-3 mb-4 d-block">
									<span v-for="error of v$.movie.rate.$errors" :key="error.$uid" class="validation-error-text">
										<strong>{{ error.$message }}</strong>
									</span>
								</small>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<slot name="footer">
						<div class="btn-group" role="group" aria-label="Basic example">
							<button
								v-if="edit"
								class="btn btn-success modal-default-button px-4 text-white"
								@click="updateMovie"
							>
								Zapisz
							</button>
							<button v-else class="btn btn-success modal-default-button px-4 text-white" @click="addMovie">
								Dodaj
							</button>
							<button class="btn btn-info modal-default-button px-4 text-white" @click="$emit('close'), clearForm()">
								Cofnij
							</button>
						</div>
					</slot>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
import MovieDataService from '../service/MovieDataService'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, between, helpers } from '@vuelidate/validators'

export default {
	props: {
		show: Boolean,
		selected: Object,
		edit: Boolean
	},
	setup() {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			movie: {
				id: '',
				title: '',
				director: '',
				year: '',
				rate: '',
			},
		}
	},
	validations() {
		return {
			movie: {
				title: {
					required: helpers.withMessage('To pole musi być uzupełnione', required),
					maxLength: helpers.withMessage('Maks 200 znaków', maxLength(200)),
				},
				director: {
					required: helpers.withMessage('To pole musi być uzupełnione', required),
					maxLength: helpers.withMessage('Maks 40 znaków', maxLength(40)),
				},
				year: {
					required: helpers.withMessage('To pole musi być uzupełnione rokiem w zakresie 1900-2200', required),
					between: helpers.withMessage('Podany rok powinien być w zakresie 1900-2200', between(1900, 2200)),
				},
				rate: {
					required: helpers.withMessage('To pole musi być uzupełnione liczbą 1-10', required),
					between: helpers.withMessage('Ocena musi być pomiędzy 1-10', between(1, 10)),
				},
			},
		}
	},
	methods: {
		async addMovie() {
			const isFormCorrect = await this.v$.$validate()
			if (!isFormCorrect) {
				return
			}

			MovieDataService.createMovie(this.movie).then(() => {
				this.clearForm()
				this.$emit('close')
			}).catch(error => {
				alert(`Nie udało się dodać filmu do bazy, sprawdź API.\n\n Kod błędu ${error}`)
			})
		},
		async updateMovie() {
			const isFormCorrect = await this.v$.$validate()
			if (!isFormCorrect) {
				return
			}

			MovieDataService.updateMovie(this.movie).then(() => {
				this.clearForm()
				this.$emit('close')
			}).catch(error => {
				alert(`Nie udało się zapisać zmian, sprawdź API.\n\n Kod błędu ${error}`)
			})
		},
		clearForm() {
			this.movie = {
				id: '',
				title: '',
				director: '',
				year: '',
				rate: '',
			}
		},
	},
	watch: {
		selected(newVal) {
			if (newVal) {
				this.movie = {
					id: this.selected.id,
					title: this.selected.title,
					director: this.selected.director,
					year: this.selected.year,
					rate: this.selected.rate,
				}
			}
		},
	},
}
</script>

<style></style>

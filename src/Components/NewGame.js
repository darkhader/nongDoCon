import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';


export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			litRuou: '',
			nongDo: '',
			canNang: '',
			gioiTinh: 0.7,
			rows: [],
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderScoreRow = this.renderScoreRow.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);

	}

	handleSubmit = (event) => {

		event.preventDefault();
		const { litRuou, nongDo, canNang, gioiTinh } = this.state;
		if(this.state.rows.length > 0){
			this.state.rows.length = 0;
		}
		const n = litRuou * nongDo;
		const m = canNang * gioiTinh;	
		const t = n / m;
		let row = this.state.rows;
		for (let i = 0; i < 48; i++) {

			row[i] = Math.round(0.79*1056 * t - 15 * i)/1000;
			if (row[i] < 0) {
				row[i] = 0;
			}
			
			
			row.push(row[i])
			



		}
		console.log(row);
		this.setState({ rows: row });


	}
	renderScoreRow = (scores) => {

		return scores.map((score, index) => {

			return (

				scores[index] > 0 ? <tr key={index}>
					<td> {index + 1} giờ</td>
					<td>{scores[index]} mg/100ml
					</td>
				</tr> :
					""


			)



		})
	}

	handleInputChange(event) {

		this.setState({ [event.target.name]: event.target.value });
	}
	handleSelectChange(event) {
		this.setState({ gioiTinh: event.target.value });
	}
	render() {
		const scores = this.state.rows ? this.state.rows : "";
		let index = scores.indexOf(0);
		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Input
							name="litRuou"
							placeholder="Số lít rượu đã uống (lít)"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							name="nongDo"
							placeholder="Nồng Độ Rượu (độ)"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							name="canNang"
							placeholder="Cân Nặng Của Bạn (kg)"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>
							Chọn Giới Tính Của Bạn:
          				<select onChange={this.handleSelectChange} value={this.state.gioiTinh}>
								<option selected value="0.7">Nam</option>
								<option value="0.6">Nữ</option>
							</select>
						</label>
					</FormGroup>
					<Button>Tính toán</Button>
				</Form>
				{scores.length > 0 ? <Table striped bordered>
					<thead>
						<tr>
							<th>Sau</th>
							<th>Nồng độ</th>
						</tr>

					</thead>

					<tbody>
						{this.renderScoreRow(scores)}
						<tr >
							<td>{index + 1} giờ</td>
							<td>0 mg/100ml
							</td>
						</tr>
					</tbody>
				</Table> : ""}

			</div>
		);
	}
}
import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			litRuou: '',
			nongDo: '',
			canNang: '',
			gioiTinh: 0.7,
			modal: false,
			rows: [],
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderScoreRow = this.renderScoreRow.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleModal = this.handleModal.bind(this);


	}

	handleSubmit = (event) => {

		event.preventDefault();
		const { litRuou, nongDo, canNang, gioiTinh } = this.state;
		if (this.state.rows.length > 0) {
			this.state.rows.length = 0;
		}

		const n = litRuou * nongDo;
		const m = canNang * gioiTinh;
		const t = n / m;
		let row = this.state.rows;
		for (let i = 0; i < 48; i++) {

			row[i] = Math.round(0.79 * 1056 * t - 15 * i) ;
			if (row[i] < 0) {
				row[i] = 0;
			}


			row.push(row[i])




		}

		this.setState({ rows: row });


	}
	renderScoreRow = (scores) => {

		return scores.map((score, index) => {

			return (

				scores[index] > 0 ? <tr key={index}>
					<td> {index} giờ</td>
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
	handleModal(event) {

		this.setState({ modal: !this.state.modal });

	}

	render() {
		const scores = this.state.rows ? this.state.rows : "";
		let index = scores.includes(NaN) ? "0" : scores.indexOf(0);


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
					<Button color="primary ml-2" onClick={this.handleModal}>Bảng Tra Cứu</Button>
					<Modal className="modal-lg " isOpen={this.state.modal} toggle={this.handleModal} >
						<ModalBody>
							<Table striped bordered>
								<thead>
									<tr>
										<th>Lỗi vi phạm</th>
										<th>Xe máy</th>
										<th>Ô tô</th>
									</tr>

								</thead>

								<tbody>

									<tr >
										<td>Có nồng độ cồn nhưng chưa quá 50mg/100ml máu ~ 0.25mg/1l khí thở  </td>
										<td>2.000.000 - 3.000.000. Tước GPLX 10 tháng - 12 tháng. </td>
										<td>6.000.000 - 8.000.000. Tước GPLX 10 tháng - 12 tháng. </td>
									</tr>
									<tr >
										<td>50mg-80mg/100ml máu ~ 0.25-0,4mg/1l khí thở </td>
										<td>4.000.000 - 5.000.000. Tước GPLX 16 tháng - 18 tháng. </td>
										<td>16.000.000 - 18.000.000. Tước GPLX 16 tháng - 18 tháng. </td>
										
									</tr>
									<tr >
										<td>Trên 80mg/100ml máu ~ 0.4mg/1l khí thở  </td>
										<td>6.000.000 - 8.000.000. Tước GPLX 22  tháng - 24 tháng. </td>
										<td>30.000.000 - 40.000.000. Tước GPLX 22  tháng - 24 tháng. </td>
										
									</tr>

							
								</tbody>
							</Table>
						</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={this.handleModal}>Cancel</Button>
						</ModalFooter>
					</Modal>
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
							<td>{index} giờ</td>
							<td>0 mg/100ml
							</td>
						</tr>
					</tbody>
				</Table> : ""}

			</div>
		);
	}
}
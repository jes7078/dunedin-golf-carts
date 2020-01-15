import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Menu from '../components/Menu'

const AdminBeer = () => {
	const [ breweryList, setBreweryList ] = useState([])
	const [ beerStyleList, setBeerStyleList ] = useState([])
	const [ beerList, setBeerList ] = useState([])
	const [ beer, setBeer ] = useState({
		id: 0,
		name: '',
		description: '',
		beerURL: '',
		abv: '',
		beerStyleId: '',
		breweriesId: ''
	})

	const updateBeerObject = (e) => {
		e.persist()
		setBeer((prevBeer) => ({
			...prevBeer,
			[e.target.name]: e.target.valueAsNumber || e.target.value
		}))
	}

	const selectBreweriesId = (e, brewery) => {
		e.preventDefault()
		setBeer((prevBeer) => ({
			...prevBeer,
			breweriesId: brewery.id
		}))
	}

	const selectBeerStyleId = (e, sty) => {
		e.preventDefault()
		setBeer((prevBeer) => ({
			...prevBeer,
			beerStyleId: sty.id
		}))
	}
	const selectIt = (id) => {
		const filterBeer = beerList.filter((beer) => {
			return beer.id === id
		})
		setBeer({
			id: filterBeer[0].id,
			name: filterBeer[0].name,
			description: filterBeer[0].description,
			beerURL: filterBeer[0].beerURL,
			abv: filterBeer[0].abv,
			beerStyleId: filterBeer[0].beerStyleId,
			breweriesId: filterBeer[0].breweriesId
		})
	}

	const createBeerList = async () => {
		const resp = await axios.get('https://localhost:5001/api/Beers')
		setBeerList(resp.data)
	}

	const addIt = async (e) => {
		e.preventDefault()
		const resp = await axios.post(`https://localhost:5001/api/Beers`, beer)
		if (resp.statusText === 'Created') {
			window.alert('Beer Added')
		} else {
			window.alert('Error, Beer Not Added')
		}
		createBeerList()
	}

	const updateIt = async (e) => {
		e.preventDefault()
		const resp = await axios.put(`https://localhost:5001/api/Beers/` + beer.id, beer)
		if (resp.statusText === 'OK') {
			window.alert('Beer Changed')
		} else {
			window.alert('Error, beer Not Changed')
		}
		createBeerList()
	}

	const deleteit = async (e, beer) => {
		e.preventDefault()
		const resp = await axios.delete('https://localhost:5001/api/Beers/' + beer.id)
		if (resp.statusText === 'OK') {
			window.alert('Beer deleted')
		} else {
			window.alert('Error, beer Not deleted')
		}
		createBeerList()
	}

	const createBreweryList = async () => {
		const resp = await axios.get('https://localhost:5001/api/Breweries')
		setBreweryList(resp.data)
	}

	const createBeerStyleList = async () => {
		const resp = await axios.get('https://localhost:5001/api/BeerStyle')
		setBeerStyleList(resp.data)
	}

	useEffect(() => {
		createBeerList()
		createBreweryList()
		createBeerStyleList()
	}, [])

	return (
		<section>
			<Menu />
			<h1 className="borderedTitle">Add, Update, or Delete a Beer Page</h1>
			<section className="addBreweryInputSection">
				<form>
					<section className="addBreweryButtons">
						<button className="addButton" onClick={addIt}>
							Add
						</button>
						<button className="addButton" onClick={updateIt}>
							Update
						</button>
						<button className="addButton" onClick={(e) => deleteit(e, beer)}>
							Delete
						</button>
					</section>
					<label>Name of Beer</label>
					<input
						name="name"
						className="inputBar"
						type="text"
						value={beer.name}
						placeholder="Enter Beer Name"
						onChange={updateBeerObject}
					/>
					<label>Beer Description</label>
					<input
						name="description"
						className="inputBar"
						type="text"
						value={beer.description}
						placeholder="Enter Beer Description"
						onChange={updateBeerObject}
					/>
					<label>Beer Pic URL</label>
					<input
						name="beerURL"
						className="inputBar"
						type="text"
						value={beer.beerURL}
						placeholder="Enter beer picture URL"
						onChange={updateBeerObject}
					/>
					<label>Beer ABV</label>
					<input
						name="abv"
						className="inputBar"
						type="text"
						value={beer.abv}
						placeholder="Enter beer ABV"
						onChange={updateBeerObject}
					/>
					<label>Beer Style Id of Beer</label>
					<input
						name="beerStyleId"
						className="inputBar"
						type="number"
						step="1"
						value={beer.beerStyleId}
						placeholder="Enter Beer Style Id"
						onChange={updateBeerObject}
					/>
					<section className="addCurrentBreweriesList">
						<ul>
							{beerStyleList.map((sty, index) => {
								return (
									<section key={index} className="addBreweryList">
										<button value={sty.id} onClick={(e) => selectBeerStyleId(e, sty)}>
											Select for Beer Style Id
										</button>
										<li key={index}>{sty.style}</li>
									</section>
								)
							})}
						</ul>
					</section>

					<label>Brewery Id of Beer</label>
					<input
						name="breweriesId"
						className="inputBar"
						type="number"
						step="1"
						value={beer.breweriesId}
						placeholder="Enter Brewery Id"
						onChange={updateBeerObject}
					/>

					<section className="addCurrentBreweriesList">
						<ul>
							{breweryList.map((bre, index) => {
								return (
									<section key={index} className="addBreweryList">
										<button value={bre.id} onClick={(e) => selectBreweriesId(e, bre)}>
											Select for Brewery Id
										</button>
										<li key={index}>{bre.name}</li>
									</section>
								)
							})}
						</ul>
					</section>
				</form>
			</section>
			<h1 className="borderedTitle">Current Beers</h1>
			<section className="addCurrentBreweriesList">
				<ul>
					{beerList.map((bee, index) => {
						return (
							<section key={index} className="addBreweryList">
								<button value={bee.id} onClick={() => selectIt(bee.id)}>
									Select for Update or Delete
								</button>
								<li key={index}>{bee.name}</li>
							</section>
						)
					})}
				</ul>
			</section>
		</section>
	)
}

export default AdminBeer

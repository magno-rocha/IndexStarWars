import React, {Component} from 'react';

class CharInfo extends Component {
constructor(){
    super()

    this.state = {
        
        species: ['Defining species...'],
        films: ['Loading films...'],
        starships: ['Loading Starships...'],
        
        
    }      

}

componentDidMount() {

    // FILMS //
        const filmsArray = [];

        const fetchFilms = this.props.films.map((filmUrl, i) => fetch(filmUrl)
            .then(res => res.json())
            .then(data => {
            filmsArray.push(`0${data.episode_id} - ${data.title}`);
            filmsArray.sort();
            }));
    
        Promise.all(fetchFilms)
            .then(promisesArray => { this.setState({films:filmsArray}) })
            .catch((err) => console.log('error: ', err))

    // STARSHIPS //      
            
            const starshipsArray = [];    
            
            const fetchStarships = this.props.starships.map((starshipUrl, i) => fetch(starshipUrl)
            .then(res => res.json())
            .then(data => {
            starshipsArray.push(`Name: ${data.name} - Model: ${data.model} - Class: ${data.starship_class}`);
            starshipsArray.sort();
            }));

            Promise.all(fetchStarships)
            .then(promisesStarshipsArray => { this.setState({starships:starshipsArray}) })
            .catch((err) => console.log('error: ', err))
        
    // SPECIES //

        fetch(this.props.species[0])
        .then(resp => resp.json())
        .then(json => this.setState({species: json.name}))
}

state = { details: true };
state = { cards : true };
        
render() {
    const { details } = this.state;
    const { name } = this.props;
    const { height } = this.props;
    const { mass } = this.props;
    const { birth_year } = this.props;
    const { gender } = this.props;
    const { hair_color } = this.props;
    const { skin_color } = this.props;
    const { eye_color } = this.props;

    return (
                    <div className='chars'>
                        <h3>{ name }</h3>
                        <div className='chars-details' >
                            <button type="button" class="btn btn-outline-secondary chars" onClick={() => this.setState({ details: !details })}>More Details</button>
                            { details ? 
                                <div><h4>{ this.state.species }</h4>
                                    <h5>Height: { height }</h5>
                                    <h5>Mass: { mass } </h5>
                                    <h5>Birth: { birth_year } </h5>
                                    <h5>Hair: { hair_color } </h5>
                                    <h5>Skin: { skin_color } </h5>
                                    <h5>Eyes: { eye_color } </h5>
                                    <h5>Gender: { gender } </h5>
                                    <div><h4>Featured in:</h4>
                                        <ul>
                                            { this.state.films.map((film, i) => (
                                            <p key={i}>
                                                { film }
                                            </p>
                                            ))}
                                        </ul>
                                    </div>
                                    <div><h4>Starships:</h4>
                                        <ul>
                                            { this.state.starships.map((starship, i) => (
                                            <p key={i}>
                                                { starship }
                                            </p>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            : null
                            }
                        </div> 
                    </div>  
                       
    )
}
} 

export default CharInfo;
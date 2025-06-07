import WeekItem from "./WeekItem";
import Icons from "./Icons";
import WeekItemTitle from "./WeekItemTitle";

const defaultPokemon = "/resource/image/Pokemon/Tyranitar.png";

const WeekItemContent = ({isMega, eventNm, shape, pokemonList}) => {
    return (
        <WeekItem className="week-item flex-container" shape={shape}>
            <WeekItemTitle className="week-item-title flex-container"shape={shape}>
                {isMega 
                    ? <img src={Icons["ME_RAID"].src} alt={Icons["ME_RAID"].alt}/> //메가레이드
                    : typeof isMega !== 'undefined' 
                        ? <img src={Icons["LG_RAID"].src} alt={Icons["LG_RAID"].alt}/> //전설레이드
                        : null //이벤트
                    } 
                {eventNm}
            </WeekItemTitle>
            <div className="week-item-content flex-container">
                {pokemonList.length > 0 && pokemonList.map((pokemon, index) => {
                    return (
                        <div key={index} className="week-item-pokemon">
                            <img src={defaultPokemon} alt={"포켓몬"}/>
                            <img src={Icons[pokemon.ref]?.src} alt={Icons[pokemon.ref]?.alt}/>
                            {pokemon.shinyYn === 'Y' && <img src={Icons["SHINY"].src} alt={Icons["SHINY"].alt}/>}
                        </div>
                    );
                })}
            </div>
        </WeekItem>
    );
}

export default WeekItemContent;
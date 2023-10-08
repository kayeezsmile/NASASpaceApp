import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid, Select, MenuItem, FormControl, InputLabel, Button, TextField } from '@material-ui/core';


import getRoundedValue from '../functions/getRoundedValue';

import { Entry } from '../interfaces/Entry';
import { TableColumn } from '../interfaces/TableColumn';
import Aladin from './Aladin';

type Props = {
    data: Entry,
    nasaData: Entry,
    tableColumns: TableColumn[],
    isOpen: boolean,
    setOpen: any,
    refId: string,
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '90%',
      height: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    planetName: {
      fontSize: '1.3rem',
    },
    em1: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    em2: {
      fontSize: '1.2rem',
    },
    em3: {
      fontSize: '0.9rem',
    },
    theme: {
      border: 'solid red',
      textAlign: 'center'
    }, 
    themeEmpty: {
      border: 'none',
    },
    button: {
      fontSize: '1.2rem'
    },
    resultBoard: {
      border: 'solid grey',
      borderRadius: '8px',
    },
    emptyResultBoard: {
      border: 'none',
      borderRadius: '8px',
    }
  }));


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflow:'scroll',
    };
  }

const Themes: {[key: string]: string} = {
  '10': 'Adventure',
  '20': 'Science Fiction',
  '30': 'Mystery Journey',
  '40': 'Survival Horror',
  '50': 'Futuristic Comedy',
  '60': 'Surreal Fantasy',
  '70': 'Psychological Thriller',
}


const getLifePrompt = (name: String, description: String) => {
  return `Based on the exoplanet description below, write different sections about what life might be like on the exoplanet with section titles 1) Introduction 2) Surface and Landscape 3) Climate and Atmosphere 3) Water Availability 4) Biodiversity and Wildlife - name the planet ${name}, ${description}, Your challenge is to use publicly available information on exoplanets to write about what life might be like on it. Is it too hot, too cold, or just right? How much water is available? What does the surface of your planet look like? Please limit the response in 15 sentences.`;
}

const getQuestPrompt = (theme: String, name: String) => {
  return `Please write paragraphs with attractive plot titles and analyse the possibility of human living there and all the good and bad things that he may face, Please limit the response in 15 sentences and try to imagine a person with the below attributes going through a ${theme} story on this planet and write a short story about it and the person's name is ${name} -  The person's Skills and Abilities and corresponding Soft Skills and Cognitive Performance Competence are as follows:`
}

const endpoint = "https://nasa-api.unseenidentity.xyz/api/v1/cv/result";
// const endpoint = "http://localhost:15006/api/v1/cv/result";

export default function PlanetDetailModal( { data, nasaData, tableColumns, isOpen, setOpen, refId }: Props ) {

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [theme, setTheme] = React.useState('');
    const [name, setName] = React.useState('');
    const [selectedBtn, setSelectedBtn] = React.useState(-1);
    const [resultLife, setResultLife] = React.useState<string[]>([]);
    const [resultQuest, setResultQuest] = React.useState<string[]>([]);
    const [generating, setGenerating] = React.useState(false);

    const handeleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setName(event.target.value as string);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setTheme(event.target.value as string);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getSelectedThemeText = () => {
      if (theme != '') {
        return Themes[theme];
      } else {
        return '';
      }
    }

    const onScreenButtonClick = () => {
      window.open(`https://nasa-screen.unseenidentity.xyz?ref=${refId}`)
    }

    const formatResult = (text: string) => {
      return text.split('\n').map((e) => `<p>${e}</p>`);
    }

    const onGenerateResult = () => {
      if (resultLife.length == 0 && resultQuest.length == 0 && !generating) {
          setGenerating(true);
          // console.log(getLifePrompt(nasaData.display_name, nasaData.description))
          // console.log(getQuestPrompt(getSelectedThemeText(), name))
          // console.log(refId)
          fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              'p1': getLifePrompt(nasaData.display_name, nasaData.description),
              'p2': getQuestPrompt(getSelectedThemeText(), name),
              'ref': refId,
              // 'ref': 'test',
            })
          })
          .then((response: any) => {
            return response.json()
          }) 
          .then((result: any) => {
            const r = result['result']
            setResultLife(formatResult(r[0] as string) as string[]);
            setResultQuest(formatResult(r[1] as string) as string []);
            setGenerating(false);
          })
          .catch((err) => {
            console.error(err);
            setResultLife(['<p>Error in Generating the result</p>']);
            setResultQuest(['<p>Error in Generating the result</p>']);
            setGenerating(false);
          });
      }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1>Congratulations, Exoplanet explorer! You've discovered your dream exoplanet. Now, let's customize your journey!</h1>
            </Grid>
            <Grid item xs={12} sm={6} container direction='column'>
              <p>Exoplanet Name: {nasaData ? (<span className={classes.planetName}>{nasaData.display_name}</span>): (<span className={classes.planetName}>{data.pl_name}</span>)}</p>
              {nasaData && <p>{nasaData.description}</p>}
              <Aladin target={data.pl_name} />
              <br/>
              <Button variant={selectedBtn === 1 ? "contained" : "outlined"} onClick={()=>{setSelectedBtn(1); onGenerateResult();}} className={classes.button}>01  🌿 Planet Life</Button>
              <br/>
              <Button variant={selectedBtn === 2 ? "contained" : "outlined"} onClick={()=>{setSelectedBtn(2); onGenerateResult();}} className={classes.button}>02  🚀 Your Survival Quest</Button>
            </Grid>
            <Grid item xs={12} sm={6} container direction='column'>
              <h2>🌟 Pick Your Exploration Style 🌟</h2>
              <p>Ready to embark on your Exoplanet Explorer journey? we're just checking to ensure you're prepared for this interstellar voyage!</p>
              <TextField id="standard-basic" label="Name" value={name} onChange={handeleNameChange}/>
              <br/>
              <FormControl className={classes.theme}>
                <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={theme}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Adventure</MenuItem>
                  <MenuItem value={20}>Science Fiction</MenuItem>
                  <MenuItem value={30}>Mystery Journey</MenuItem>
                  <MenuItem value={40}>Survival Horror</MenuItem>
                  <MenuItem value={50}>Futuristic Comedy</MenuItem>
                  <MenuItem value={60}>Surreal Fantasy</MenuItem>
                  <MenuItem value={70}>Psychological Thriller</MenuItem>
                </Select>
              </FormControl>
              <br/>
              <p className={classes.em1}>Unlock Your Personalized Survival Quest in Seconds</p>
              <Button variant="contained" color="primary" onClick={onScreenButtonClick}>
                Get Your 30-second Screening Result
              </Button>
              <br/>
              <p className={classes.em2}>We use the insights from the 30-second Neuroscience Generative AI Screening to personalize your experience to your distinct cognitive abilities, equipping you to navigate habitability challenges on this exoplanet, intrinsically linked to a one-of-a-kind personalized journey!</p>
              <p className={classes.em3}>It is a generative scientific screening model crafted with an experimental spirit, with our continuous dedication to achieving predictive precision in behavioural signal detection, as you engage with gamified scientific stimuli on the screen to assess your behavioural performance and cognitive traits. No sensors or text input required.</p>
              <p>Reveal your unique persona and present emotions, precisely determined through our 30-second scientific screening process.</p>
              <p className={classes.em3}>Within seconds, our scientifically designed gamified stimuli will interact with you on the screen, and instantly reveal incredible insight about you and personalize your input content.</p>
            </Grid>
            <Grid item xs={12} sm={12} className={selectedBtn == -1 ? classes.emptyResultBoard : classes.resultBoard}>
              {
                generating && <p>Generating...</p>
              }
              {selectedBtn === 1 && <div dangerouslySetInnerHTML={{__html: resultLife.join('')}} /> }
              {selectedBtn === 2 && <div dangerouslySetInnerHTML={{__html: resultQuest.join('')}} />}
            </Grid>
            {/* <Grid item xs={12} sm={4} container direction='column' spacing={2} alignContent='flex-start'>
              
            </Grid> */}
          </Grid>
          {/* <h2 id="simple-modal-title">{nasaData.display_name}</h2>
          <p id="simple-modal-description">
            {nasaData.description}
          </p>
          <Aladin target={data.pl_name} /> */}
          {/* <PlanetDetailModal data={data} tableColumns={tableColumns} isOpen={isOpen}/> */}
        </div>
      );

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    )
}
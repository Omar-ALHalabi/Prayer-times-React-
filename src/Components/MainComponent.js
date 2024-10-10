import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import PrayerImage from './PrayerImgs.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import img1 from '../images/1.jpg';
import { useEffect, useState } from 'react';
import moment from 'moment'
import "moment/locale/ar-dz";
moment.locale("ar-dz"); 


export default function MainContent() {

    const [today, settoday] = useState("");
    const [nextPrayerIndex, setnextPrayerIndex] = useState(0);
    const [RemainingTime, SetRemainingTime]=useState("");
    const AvailableCities = [
        {
            displayName: 'بيروت',
            apiName: 'Beirut',
            iso: 'LB'
        },


        {
        displayName: 'مكة المكرمة',
            apiName: 'Makkah al Mukarramah',
            iso: 'SA'
    },
       
        {
            displayName: 'برلين',
            apiName: 'Berlin',
            iso: 'DE',
        },
        
        

    ]

    const PrayersArray = [
       { key:"Fajr",Name:'الفجر'},
        { key:"Dhuhr",Name:'الظهر'},
        { key:"Asr",Name:'العصر'},
        { key:"Maghrib",Name:'المغرب'},
        { key:"Isha",Name:'العشاء'},
      


    ]

    const [City, SetCity] = useState({

        displayName: 'بيروت',
        apiName: 'Beirut',
        iso: 'LB'
    });

    const [timings, Settimings] = useState({
        Fajr: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
        
    

    });




    const handleCityChange = (event) => {
        const cityObject = AvailableCities.find((city) => {
            return city.apiName == event.target.value;
        })

        SetCity(cityObject);
    };


    const GetTiming = async () => {

        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=${City.iso}&city=${City.apiName}`)
       /* console.log(response.data.data.timings);*/

        Settimings(response.data.data.timings)
    }


    function SetUpCountTimer() {

        const MomentNow = moment();

        let NextPrayer=0 ;

        if (MomentNow.isAfter(moment(timings["Fajr"], "hh:mm")) && (MomentNow.isBefore(moment(timings["Dhuhr"], "hh:mm")))) {
            NextPrayer = 1;
          
        } else if (MomentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) && (MomentNow.isBefore(moment(timings["Asr"], "hh:mm"))))
        {
            NextPrayer = 2;
        } else if (MomentNow.isAfter(moment(timings["Asr"], "hh:mm")) && (MomentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))))
        {
            NextPrayer = 3;
           

        } else if (MomentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) && (MomentNow.isBefore(moment(timings["Isha"], "hh:mm")))) {

            NextPrayer = 4;
        } else 
        {
            NextPrayer = 0;
        }

        setnextPrayerIndex(NextPrayer);

        let NextprayerObject = PrayersArray[NextPrayer];
        let NextPrayerTime = timings[NextprayerObject.key];

        let remainingtime = moment(NextPrayerTime, "hh:mm").diff(MomentNow);


        if (remainingtime < 0) {

            const midNighitDiff = moment("23:59:59", "hh:mm:ss").diff(MomentNow);
            const fajrToMidNight = moment(NextPrayerTime,"hh:mm").diff(moment("00:00", "hh:mm"));

           remainingtime = fajrToMidNight + midNighitDiff;
          
         

        }

    
        const DurationRemainingTime= moment.duration(remainingtime);

        SetRemainingTime(`${DurationRemainingTime.hours()}:${DurationRemainingTime.minutes()}:${DurationRemainingTime.seconds()}`)
   


   } 
   


    useEffect(() => {

        GetTiming();
       


    }, [City])


    useEffect(() => {

        const dateTime = moment().format('MMMM  YYYY | h:mm:ss');
        settoday(dateTime);
      

       let interval = setInterval(() => {
           SetUpCountTimer();
          
        }, 1000)


        return () => {
            clearInterval(interval);

        }
     
       
    }, [timings])
  





    return (
        <> 
            {/* top row*/}
            <Grid container spacing={2} style={{color:'#fff'} } >

                    <Grid size={6} xs={6} >
                        <div>
                        <h2>{today}</h2>
                        <h1>{City.displayName}</h1>
                       
                        </div>

                    </Grid>

                    <Grid size={6}>

                    <h2>متبقي حتى صلاة {PrayersArray[nextPrayerIndex].Name}</h2>
                    <h1> {RemainingTime}</h1>

                    </Grid>
            </Grid>
            {/* top row*/} 

            <Divider style={{ borderColor: "#fff",marginTop:'20px',opacity:'0.1' }} />
           

            <Stack direction="row" spacing={2} style={{ marginTop: '50px', marginRight: '50px' }}>
                <PrayerImage Name="الفجر" time={timings.Fajr} img="https://img.freepik.com/premium-photo/islamic-mosque-background-copy-space-banner_760408-737.jpg?w=996" />
                <PrayerImage Name="الظهر" time={timings.Dhuhr} img="https://img.freepik.com/free-photo/lit-up-mosque-with-lights-moon-is-lit-up_1340-45718.jpg" />
                <PrayerImage Name="العصر" time={timings.Asr} img="https://img.freepik.com/premium-photo/islamic-mosque-background-copy-space-banner_760408-737.jpg?w=996" />
                <PrayerImage Name="المغرب" time={timings.Maghrib} img="https://img.freepik.com/free-photo/free-photo-ramadan-kareem-eid-mubarak-royal-elegant-lamp-with-mosque-holy-gate-with-fireworks_1340-23595.jpg" />
                <PrayerImage Name="العشاء" time={timings.Isha} img={require('../images/1.jpg')} />
                {/*<PrayerImage Name="العشاء" time={timings.Isha} img={img1} />*/}

               
            </Stack>


            <Stack> 
                <Box sx={{ minWidth: 120 }}>
                    <FormControl style={{   width: "20%", marginTop: '20px' }}>
                        <InputLabel id="demo-simple-select-label">
                            <span style={{color:'#fff'}}> المدينة</span>
                        </InputLabel>

                        <Select 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                           /* value={age}*/
                            label="Age"
                            onChange={handleCityChange}
                            style={{ color: '#fff' }}
                        >

                            {AvailableCities.map((e) => {
                                return <MenuItem key={e.apiName} value={e.apiName}>
                                    {e.displayName}
                                </MenuItem>

                            })}

                        </Select>
                    </FormControl>
                </Box>

            </Stack>
            
        </>

    )
}


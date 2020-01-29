import React, { useEffect, useState } from 'react';
import { Grid, FormControl, FormControlLabel, FormLabel, TextField, Radio, RadioGroup } from '@material-ui/core';
import Part from './Part';
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';
import useStyles from './HomepageBodyStyles';
import data from '../resources/exampleData';
import { sendData } from '../utils/utility';
import FilterListIcon from '@material-ui/icons/FilterList';
import SnackbarFactory from './SnackbarFactory';

export default function HomepageBody() {
  const classes = useStyles();
  const [partState, setPartState] = useState({});
  const [partData, setPartData] = useState(data);
  const [generateStatus, setGenerateStatus] = useState(null);

  useEffect(() => {}, []);

  const displaySnackbar = () => {
    if (generateStatus === 0) {
      return <SnackbarFactory type='error' message='Error sending data.' unmount={setGenerateStatus} />;
    } else if (generateStatus === 1) {
      return <SnackbarFactory type='success' message='Data sent successfully.' unmount={setGenerateStatus} />;
    } else {
      return <></>;
    }
  };

  const handleSendData = () => {
    try {
      sendData();
      setGenerateStatus(1);
    } catch (err) {
      setGenerateStatus(0);
    }
  };

  const handleChange = event => {
    let dataSubset = data.filter(item => {
      return item.partName.includes(event.target.value);
    });
    setPartData(dataSubset);
  };

  return (
    <>
      <Grid style={{ flexGrow: '1' }}>
        <Grid className={classes.searchBody} container alignItems='center'>
          {/* <FormControl component='fieldset' className={classes.formControl}> */}
          {/* <FormLabel component='legend'>Filter Lego parts</FormLabel> */}
          <h2 className={classes.searchTitle}>Filter Lego Parts</h2>
          {/* <RadioGroup aria-label='Search by' name='searchBy' value={value} onChange={handleChange}>
              <FormControlLabel value='name' control={<Radio />} label='part name' />
              <FormControlLabel value='id' control={<Radio />} label='part number' />
            </RadioGroup> */}
          {/* </FormControl> */}
          <TextField
            id='outlined-search'
            label='Search by name...'
            type='search'
            variant='outlined'
            onChange={handleChange}
          />
          <FilterListIcon style={{ margin: '1rem', cursor: 'pointer' }} />
        </Grid>
        <Grid className={classes.partsBody} container direction='row' justify='space-around'>
          {partData.map((item, key) => {
            return <Part style={{ marginTop: '2rem' }} data={item} key={key} />;
          })}
        </Grid>
        <div style={{ bottom: 0, position: 'fixed', right: 0 }}>
          <Button
            variant='contained'
            color='secondary'
            style={{ margin: '1rem', marginLeft: 'auto', width: '12rem' }}
            onClick={handleSendData}
          >
            Generate <BuildIcon style={{ padding: '0.5rem 0rem 0.5rem 1rem' }} />
          </Button>
        </div>
      </Grid>
      {displaySnackbar()}
    </>
  );
}

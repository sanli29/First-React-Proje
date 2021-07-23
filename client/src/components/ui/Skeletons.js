import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Paper, Card, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto'
  },
  card: {
    margin: theme.spacing(2)
  },
  media: {
    height: 500,
    flexGrow: 1
  },
  grids: {}
}));

function CellSkeleton() {
  return (
    <>
      <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
    </>
  );
}

export const Table = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <div>
              <Skeleton animation="wave" variant="circle" width={40} height={40} />
            </div>
          }
          action={<div></div>}
          title={
            <div>
              Table is loading...
              <Skeleton animation="wave" height={10} width="35%" style={{ marginBottom: 6 }} />
            </div>
          }
          subheader={<Skeleton animation="wave" height={10} width="25%" />}
        />

        <CardContent style={{ width: '100%' }}>
          <div style={{ flexGrow: '1' }}>
            <Grid container row spacing={2}>
              <Grid container item spacing={3}>
                <Grid item className={classes.grids} xs={6}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={6}>
                  <CellSkeleton />
                </Grid>
              </Grid>
              <Grid container item spacing={8}>
                <Grid item className={classes.grids} xs={3}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={3}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={3}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={3}>
                  <CellSkeleton />
                </Grid>
              </Grid>
              <Grid container item spacing={6}>
                <Grid item className={classes.grids} xs={2}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={2}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={2}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={2}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={2}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={2}>
                  <CellSkeleton />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
                <Grid item className={classes.grids} xs={1}>
                  <CellSkeleton />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

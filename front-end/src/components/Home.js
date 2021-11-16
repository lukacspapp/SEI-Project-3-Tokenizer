/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Grid, Button, Icon, Divider, Container, Header, Card, Label } from 'semantic-ui-react'
import { CarouselProvider, Image, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import axios from 'axios'

const Home = () => {

  const [nftData, setNftData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/all')
        if (!data) throw new Error()
        setNftData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className='home' >

        <Container textAlign='center'>
          <Grid width={3}>
            <Grid.Row centered style={{ margin: '70px 50px', alignItems: 'center', justifyContent: 'space-around' }}>
              <Grid.Column textAlign='center' style={{  alignItems: 'center' }} width={6}>
                <CarouselProvider
                  naturalSlideWidth={1}
                  naturalSlideHeight={1.25}
                  totalSlides={4}
                  style={{ width: '315px' }}
                  orientation='vertical'
                  visibleSlides={1}>
                  <Slider>
                    {nftData.filter((_item, index) => index < 4).map((product, index) => {
                      return (
                        <>
                          <Slide key={index}>
                            <Card as='a' href={`/browse/${product._id}`}>
                              <Image src={product.image}></Image>
                              <Card.Content>
                                <Card.Header>{product.name}</Card.Header>
                              </Card.Content>
                              <Card.Content extra>
                                <Label>
                                  <Icon name='bitcoin'/>Price: {product.currentPrice}
                                </Label>
                              </Card.Content>
                            </Card>
                          </Slide>
                          <Divider />
                        </>
                      )
                    })}
                  </Slider>
                  <Container textAlign='center'>
                    <ButtonBack className='smallButtons'>Back</ButtonBack>
                    <ButtonNext className='smallButtons'>Next</ButtonNext>
                  </Container>
                </CarouselProvider>
              </Grid.Column>
              <Grid.Column
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }} width={6}>
                <Header textAlign='center' as='h1'>
                  Discover the world of NFTs
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Create, Buy or Sell Nfts
                </p>
                <Container textAlign='center' style={{ marginTop: '30px' }}>
                  <Button style={{ marginRight: '30px' }} inverted color='violet' as='a' href='/register'>
                    Get Started
                  </Button>
                  <Button color='violet' as='a' href='/browse'>
                    Discover
                  </Button>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Divider hidden />
        <Grid>
          <Grid.Column>
          </Grid.Column>
        </Grid>

      </div>
    </>
  )
}

export default Home
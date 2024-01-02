import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'

export default function Dashboard(props) {
  const { auth, handleAuth } = useAuth()
  const [emailList, setEmailList] = useState([])
  const { filter = '' } = props
  const emailType = filter.substring(filter.indexOf('/') + 1)
  const [currentMail, setCurrentMail] = useState(null)
  
  useEffect(() => {
    fetch('../../../data/messages.json')
      .then(res => res.json())
      .then(res => {
        setEmailList(res.filter((r) => r.folder === emailType));
      })
  }, [emailType])

  function convertTimestamp1(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function convertTimestamp2(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

  }

  const generatePath = (pathname, id) => {
    if (pathname.split('/').length - 1 > 3) {
      let prevPathName = pathname.slice(0, pathname.lastIndexOf("/"))
      return (prevPathName + `/${id}`);
    } else {
      return (pathname + `/${id}`);
    }
  }

  const handleClick = (email, index, e) => {
    setCurrentMail(email)
    const newEmail = { ...email, unread: true }
    const newList = [...emailList]
    newList[index] = newEmail;
    setEmailList(newList)
  }

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className='h-100'>
        <Col xs={2} className='p-0 d-flex text-white' style={{ backgroundColor: '#0e1f33' }}>
          <Container className='p-0 d-flex flex-column'>
            <Row className='w-100 m-0 logo' style={{ paddingLeft: '40px' }}>
              <img className='p-0' style={{ height: '100%', maxWidth: '186px' }} src="../../images/connect-logo-white.svg" alt="" />
            </Row>
            <Row className='flex-grow-1 w-100 m-0'>
              <Col xs={12} className='p-0'>
                <Row className='w-100 m-0 h-100' onClick={() => { setCurrentMail(null) }}>
                  <Col xs={3} className='p-0'>
                    <NavLink to={'/main/home'} className='nav-icon d-flex justify-content-center align-items-center'>
                      <i className="fa-solid fa-house"></i>
                    </NavLink>
                    <NavLink to={'/main/email'} className='nav-icon d-flex justify-content-center align-items-center'>
                      <i className="fa-solid fa-envelope"></i>
                    </NavLink>
                    <NavLink to={'/main/contact'} className='nav-icon d-flex justify-content-center align-items-center'>
                      <i className="fa-solid fa-user"></i>
                    </NavLink>
                  </Col>
                  <Col xs={9} style={{ backgroundColor: '#152943' }}>
                    {filter.includes('email')
                      ? <>
                        <Row><NavLink to={'/main/email/inbox'} className={'nav-email'}>Inbox</NavLink></Row>
                        <Row><NavLink to={'/main/email/sent'} className={'nav-email'}>Sent</NavLink></Row>
                        <Row><NavLink to={'/main/email/reminder'} className={'nav-email'}>Reminder</NavLink></Row>
                        <Row><NavLink to={'/main/email/spam'} className={'nav-email'}>Spam</NavLink></Row>
                        <Row><NavLink to={'/main/email/favorite'} className={'nav-email'}>Favorite</NavLink></Row>
                        <Row><NavLink to={'/main/email/junks'} className={'nav-email'}>Junks</NavLink></Row>
                        <Row><NavLink to={'/main/email/drafts'} className={'nav-email'}>Drafts</NavLink></Row>
                      </>
                      : <>
                        <div className='w-100 p-3'>
                          <p className='m-0 text-center'>
                            Construction
                          </p>
                        </div>
                      </>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={10} className='p-0' style={{ height: '100vh' }}>
          <Container fluid className='p-0 h-100'>
            <Row className='email-header m-0'>
              <div className='path'>
                Pathname:&nbsp;<span className='fw-bold'>{window.location.pathname}</span>
              </div>
              <div className='user'>
                <div className='info d-flex flex-column text-center'>
                  <Col className='fw-bold'>
                    {auth.name}
                  </Col>
                  <Col className='fw-light'>
                    {auth.email}
                  </Col>
                </div>
                <div className='avatar h-100 p-2'>
                  <img style={{ height: '100%' }} className='rounded-circle' src="https://i.pravatar.cc/320?img=65" alt="" />
                </div>
                <div className='logout-btn shadow-sm' onClick={() => { handleAuth(null) }}>
                  <i className="fa-solid fa-power-off"></i>
                </div>
              </div>
            </Row>
            <Row className='email-container m-0'>
              <Container style={{ height: '100%', padding: '0' }}>
                <Row className='h-100 mh-100 m-0'>
                  {filter.includes('email')
                    ? <>
                      <Col xs={3} className='email-list p-0'>
                        {emailList.length !== 0
                          ? <>
                            <Container className='p-0'>
                              {emailList.map((email, index) => {
                                return (
                                  <Row className={email.unread ? '' : 'unread'} key={email.id} style={{ margin: '0' }}>
                                    <NavLink to={generatePath(window.location.pathname, email.id)} className='text-decoration-none p-0' onClick={(e) => handleClick(email, index, e)}>
                                      <Row className='email-item'>
                                        <Col xs={3}>
                                          <div>
                                            <img className='rounded-circle p-1' style={{ width: '100%' }} src={email.from.avatarUrl} alt="" />
                                          </div>
                                        </Col>
                                        <Col xs={9} style={{ paddingLeft: '0' }}>
                                          <div className='d-flex justify-content-between gray' style={{ fontWeight: '500', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                                            <span>{email.from.name}</span>
                                            <span>{convertTimestamp1(email.timestamp)}</span>
                                          </div>
                                          <div className='text-truncate fw-bold black'>
                                            {email.main.title}
                                          </div>
                                          <div className='description-text gray' style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                                            {email.main.content}
                                          </div>
                                        </Col>
                                      </Row>
                                    </NavLink>
                                  </Row>
                                )
                              })}
                            </Container>
                          </>
                          : <div className='no-email'><p style={{ fontSize: '30px' }}>Please choose a folder</p></div>}
                      </Col>
                      <Col xs={9} className='email-details p-4'>
                        {currentMail
                          ? <>
                            <Col xs={12} style={{ maxHeight: '20%' }}>
                              <div className='email-info d-flex justify-content-between h-100'>
                                <div className='sender-info d-flex' style={{ maxWidth: '22%' }}>
                                  <Row>
                                    <Col xs={4} className='avatar-container d-flex align-items-center'>
                                      <div>
                                        <img className='rounded-circle' style={{ width: '100%' }} src={currentMail.from.avatarUrl} alt="" />
                                      </div>
                                    </Col>
                                    <Col xs={8} className='sender-detail p-0 d-flex flex-column justify-content-center'>
                                      <p className='fw-bold'>{currentMail.from.name}</p>
                                      <p style={{ color: 'gray', fontWeight: 'lighter' }}>{currentMail.from.email}</p>
                                    </Col>
                                  </Row>
                                </div>
                                <div className='btns-date flex-grow-1 d-flex justify-content-end align-content-center'>
                                  <div className='date d-flex' style={{ marginRight: '15px' }}>
                                    <p style={{ color: 'gray', fontWeight: 'lighter' }} className='d-flex align-items-center'>{convertTimestamp2(currentMail.timestamp)}</p>
                                  </div>
                                  <div className='btns-container d-flex align-items-center'>
                                    <Button className='mx-1 px-3 py-2 shadow-sm reply'>
                                      Reply
                                    </Button>
                                    <Button className='mx-1 px-3 py-2 shadow-sm forward'>
                                      Forward
                                    </Button>
                                    <Button className='mx-1 px-3 py-2 shadow-sm delete'>
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col xs={12} className='email-content py-5'>
                              <p style={{ fontSize: '40px', fontWeight: 'bold' }}>{currentMail.main.title}</p>
                              <p className='py-5' style={{ borderBottom: '1px rgb(194, 194, 194) solid' }}>{currentMail.main.content}</p>
                            </Col>
                          </>
                          : <div className='no-email'><p style={{ fontSize: '30px' }}>Please choose a folder first</p></div>}
                      </Col>
                    </>
                    : <>
                      <div className='d-flex w-100 justify-content-center align-items-center'>
                        <img style={{ width: '100%', maxWidth: '600px', height: 'auto' }} src="../../images/under-construction.png" alt="" />
                      </div>
                    </>}
                </Row>
              </Container>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

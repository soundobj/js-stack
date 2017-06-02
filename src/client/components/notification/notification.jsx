import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Carousel } from "react-bootstrap";
import { intl } from "../../i18n";

const template = function () {
  const notifications = this.props.notification.toJS().notifications;
  return (
    <ReactCSSTransitionGroup
      transitionName="notificationsTray"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
    >

      {notifications.length &&
      <div className="notification__container">
        <span className="glyphicon glyphicon-remove notification__close" onClick={this.handleCloseNotification} />
        <Carousel className="notification" key="carousel" controls={false}>
          {notifications.map((notification, index) => {
            return (
              <Carousel.Item key={index} className="notification">
                <Carousel.Caption>
                  <h3 className="notification__error">{notification.error}</h3>
                  <p className="notification__message">{intl.formatMessage({ id: `notification.${notification.error}` }, notification.values)}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      }

    </ReactCSSTransitionGroup>
  );
};

export default template;
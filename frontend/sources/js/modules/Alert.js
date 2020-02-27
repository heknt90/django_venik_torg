'use strict';


const alertWrapper = document.querySelector('.alerts-wrap');

let showTimeout = 6000;


class Alert {
    constructor({status='info', title='Заголовок', message="Текст сообщения", isConfirm=false, isHold=false}) {

        this.state = {
            status,
            title,
            message,
            isHold,
            isConfirm,
        }

        this.create();
        this.show();
    }

    create() {
        // Назначаем id
        const id = Alert.idCounter++;
        this.id = id;        

        // Создали контейнер для сообщения
        let wrap = document.createElement('div');
        wrap.dataset.role = "alert"
        wrap.dataset.alertId = id;
        wrap.className = 'alert';

        // Тип сообщения определяем в классе
        switch (this.state.status) {
            case 'danger':
                wrap.classList.add('alert_danger');
                break;
            case 'warning':
                wrap.classList.add('alert_warning');
                break;
            case 'success':
                wrap.classList.add('alert_success');
                break
            case 'info':
            default:
                wrap.classList.add('alert_info');
        }

        // Создаем кнопку закрытия сообшения
        let btnClose = document.createElement('button');
        btnClose.setAttribute('type', 'button');
        btnClose.className = 'icon icon_size_16 icon-close alert__close';
        wrap.append(btnClose);

        // Создаем индикатор статуса
        let status = document.createElement('span');
        status.className = 'alert__status-indicator';
        wrap.append(status);

        // Если есть title, создаем и добавляем
        if (this.state.title) {
            let title = document.createElement('h5');
            title.className = "alert__title";
            title.textContent = this.state.title;
            wrap.append(title);
        }

        // Добавляем сообщение
        let message = document.createElement('p');
        message.className = "alert__content";
        message.textContent = this.state.message
        wrap.append(message);

        // Если должен быть confirm, то добавляем блок с кнопками
        // Если confirm, то соощение НЕ должно исчезать само

        this.nodeElement = wrap;
        this.init();
    }

    init() {
        let button = this.nodeElement.querySelector('.alert__close');
        button.addEventListener('click', this.close.bind(this));
    }
    
    show() {
        alertWrapper.append(this.nodeElement);

        let self = this;

        if (!this.state.isHold) {             
            setTimeout(function() {
                self.fading(self.id)
            }, showTimeout);
        }
    }
    
    hide(id) {
        let el = this.getAlert(id);
        el.remove();
        
    }

    close(e) {
        let alertNode = e.target.closest('[data-role="alert"]');
        let elId = alertNode.dataset.alertId;
        
        this.hide(elId);
    }

    fading(id) {
        try {
            let el = this.getAlert(id);
            el.setAttribute('style', 'opacity:0;');
            
                setTimeout(function() {
                    el.remove();
                }, 2000)
        }
        catch {
            return;
        }
    }

    getAlert(id) {
        return alertWrapper.querySelector('[data-alert-id="' + id + '"]');
    }
}

Alert.idCounter = 1;

module.exports = {
    Alert
}
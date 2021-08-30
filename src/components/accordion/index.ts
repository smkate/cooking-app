interface AccordionOptions {
  selector: string;
  selectorParentData: string;
  selectorBtnData: string;
  selectorBodyData: string;
  activeClassParent: string;
  activeClassBtn: string;
  activeClassBody: string;
  closeOthers: boolean;
}

class Accordion {
  private readonly defaultOptions: AccordionOptions
  private accordionList: HTMLElement[]
  private wrapper: HTMLElement;
  private contentWrapper: HTMLElement;
  private height: number;
  // @ts-ignore
  private state: string;

  constructor() {
    // Опции по умолчанию
    this.defaultOptions = {
      selector: '.j-accordion',
      selectorParentData: 'data-item',
      selectorBtnData: 'data-btn',
      selectorBodyData: 'data-body',
      activeClassParent: 'accordion__item_active',
      activeClassBtn: 'accordion__btn_active',
      activeClassBody: 'accordion__body_active',
      closeOthers: true
    };
  }

  /**
   * Иницализирует модуль
   * @param {object} options - опции аккордиона
   */
  init(options: AccordionOptions) {
    // применение опций из настроек
    this.optionsUpdate(options);
    this.getAccordionList(this.defaultOptions.selector);
  }

  /**
   * Получает список аккордионов
   * @param {object} wrapper - обёртка аккордиона
   */
  getAccordionList(wrapper: string): void {
    this.accordionList = Array.from(document.querySelectorAll(wrapper));

    if (!this.accordionList.length) {
      return;
    }

    this.accordionList.forEach((item: HTMLElement) => {
      this.bindEvents(item);
    });
  }

  /**
   * Навешивает обработчик событий
   * @param {object} item - аккордион
   */
  bindEvents(item: HTMLElement) {
    item.addEventListener('click', (event) => {
      // @ts-ignore
      const btn = event.target.closest(`[data-${this.defaultOptions.selectorBtnData}]`);

      if (!btn) {
        return;
      }

      // Получаем контент
      const body = item.querySelector(
        `[data-${this.defaultOptions.selectorBodyData}='${
          btn.dataset[this.defaultOptions.selectorBtnData]
        }']`
      );

      // Получаем родителя
      // @ts-ignore
      const parent = event.target.closest(`[data-${this.defaultOptions.selectorParentData}]`);

      const isActive = btn.classList.contains(this.defaultOptions.activeClassBtn);

      if (isActive) {
        // Закрываем аккардеон
        this.close(btn, this.defaultOptions.activeClassBtn);

        if (parent) {
          this.close(parent, this.defaultOptions.activeClassParent);
        }
        if (body) {
          this.close(<HTMLElement>body, this.defaultOptions.activeClassBody);
        }
      } else {
        // Закрываем другие аккардеоны если нужно
        if (this.defaultOptions.closeOthers) {
          this.closeOthers(parent);
        }

        // Открываем аккардеон
        this.open(btn, this.defaultOptions.activeClassBtn);

        if (parent) {
          this.open(parent, this.defaultOptions.activeClassParent);
        }
        if (body) {
          this.open(<HTMLElement>body, this.defaultOptions.activeClassBody);
        }
      }
    });
  }

  nextItems(element: HTMLElement, elementsList: HTMLElement[] = []) {
    const nextElement: Element = element.nextElementSibling;

    if (nextElement) {
      elementsList.push(<HTMLElement>nextElement);
      this.nextItems(<HTMLElement>nextElement, elementsList);
    }
    return elementsList;
  }

  prevItems(element: HTMLElement, elementsList: HTMLElement[] = []) {
    const prevElement: Element = element.previousElementSibling;

    if (prevElement) {
      elementsList.push(<HTMLElement>prevElement);
      this.prevItems(<HTMLElement>prevElement, elementsList);
    }
    return elementsList;
  }

  nighboursItems(element: HTMLElement) {
    return [...this.prevItems(element), ...this.nextItems(element)];
  }

  /**
   * Переключает класс элемента аккардиона
   * @param {object} element - текущий элемент
   * @param {object} elementClass -  перключаемый класс
   */
  open(element: HTMLElement, elementClass: string) {
    element.classList.add(elementClass);
  }

  /**
   * Переключает класс элемента аккардиона
   * @param {object} element - текущий элемент
   * @param {object} elementClass -  перключаемый класс
   */
  close(element: HTMLElement, elementClass: string) {
    element.classList.remove(elementClass);
  }

  /**
   * Применяет пользовательские опции
   * @param {object} options - текущий элемент аккардиона
   */
  optionsUpdate(options: AccordionOptions) {
    if (options) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          if (this.defaultOptions[key]) {
            this.defaultOptions[key] = options[key];
          } else {
            console.log(`Опции: ${key}, нет для аккордиона`);
          }

          if (
            key === 'selectorParentData' ||
            key === 'selectorBtnData' ||
            key === 'selectorBodyData'
          ) {
            this.defaultOptions[key] = this.defaultOptions[key].replace(/data-{1}/i, '');
          }
        }
      }
    }
  }

  /**
   * Если изначально установлен активный класс, то метод откроет аккордион.
   * @private
   */
  checkActiveState() {
    const isActive = this.wrapper.classList.contains(this.defaultOptions.activeClassParent);

    if (isActive) {
      this.contentWrapper.style.height = `${this.height}px`;
      this.state = 'open';
    }
  }

  /**
   * Если при открытии аккардеона другие нужно закрывать
   * @private
   */
  closeOthers(item: HTMLElement) {
    const neighboursList = this.nighboursItems(item);

    console.log(neighboursList);

    // if (this.defaultOptions.closeOthers === true) {
    //   const itemActives = item.querySelectorAll(`
    //     .${this.defaultOptions.activeClassParent},
    //     .${this.defaultOptions.activeClassBtn},K
    //     .${this.defaultOptions.activeClassBody}`);
    // console.log(itemActives);

    if (neighboursList.length) {
      neighboursList.forEach(el => {
        el.classList.remove(`${this.defaultOptions.activeClassParent}`);
        el.classList.remove(`${this.defaultOptions.activeClassBtn}`);
        el.classList.remove(`${this.defaultOptions.activeClassBody}`);
      });
    }
    // }
  }
}

export default Accordion;

/**
 * Пример использования
 */

// import Accordion from '../../components/accordion';

/**
 * Аккордион
 */
// const accordion = new Accordion();
// accordion.init({
//   selector: '.j-accordion',
//   selectorParentData: 'data-item',
//   selectorBtnData: 'data-btn',
//   selectorBodyData: 'data-body',
//   activeClassParent: 'accordion__item_active',
//   activeClassBtn: 'accordion__btn_active',
//   activeClassBody: 'accordion__body_active',
//   closeOthers: true
// });

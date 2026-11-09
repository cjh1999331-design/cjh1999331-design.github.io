(() => {
  'use strict';
  const translations = window.translations;
  const languageTags = { zh: 'zh-CN', en: 'en', km: 'km' };
  const storageKey = 'golden-dragon-language';
  let language = 'zh';
  let category = 'all';
  let submitted = false;
  let validSubmission = false;
  const form = document.querySelector('form');
  const fields = [...form.querySelectorAll('input, textarea')];
  const t = key => translations[language][key];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function renderMenu() {
    const filters = document.querySelector('.filters');
    filters.replaceChildren();
    ['all', 'signature', 'home', 'soup', 'drink'].forEach(key => {
      const button = element('button', '', t(key));
      button.type = 'button';
      button.setAttribute('aria-pressed', String(category === key));
      button.addEventListener('click', () => {
        category = key;
        renderMenu();
        document.querySelectorAll('.filters button')[['all','signature','home','soup','drink'].indexOf(key)].focus();
      });
      filters.append(button);
    });
    const dishes = document.querySelector('#dishes');
    dishes.replaceChildren();
    t('dishes').filter(dish => category === 'all' || dish.category === category).forEach(dish => {
      const card = element('article', 'dish');
      const head = element('div', 'dish-head');
      const names = element('div');
      const cn = element('h3', '', dish.cn); cn.lang = 'zh-CN';
      const en = element('div', 'english', dish.en); en.lang = 'en';
      names.append(cn, en);
      head.append(names, element('span', 'price', dish.price));
      card.append(head, element('p', '', dish.description), element('span', 'chip', t(dish.category)));
      dishes.append(card);
    });
  }
  function validateField(field) {
    const key = !field.value.trim() ? 'required' : field.type === 'email' && field.validity.typeMismatch ? 'invalidEmail' : null;
    field.setAttribute('aria-invalid', String(Boolean(key)));
    document.getElementById(`${field.id}-error`).textContent = key ? t(key) : '';
    return !key;
  }
  function renderStatus() {
    if (submitted) fields.forEach(validateField);
    document.querySelector('#form-status').textContent = validSubmission ? t('success') : '';
  }
  function setLanguage(next) {
    language = Object.hasOwn(languageTags, next) ? next : 'zh';
    document.documentElement.lang = languageTags[language];
    document.title = t('title');
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
    document.querySelectorAll('[data-label]').forEach(node => node.setAttribute('aria-label', t(node.dataset.label)));
    document.querySelectorAll('[data-title]').forEach(node => node.title = t(node.dataset.title));
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    renderMenu();
    renderStatus();
    try { localStorage.setItem(storageKey, language); } catch { /* Storage may be disabled. */ }
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    submitted = true;
    const results = fields.map(validateField);
    validSubmission = results.every(Boolean);
    renderStatus();
    if (!validSubmission) fields[results.indexOf(false)].focus();
  });
  fields.forEach(field => field.addEventListener('input', () => {
    validSubmission = false;
    if (submitted) validateField(field);
    document.querySelector('#form-status').textContent = '';
  }));
  try { language = localStorage.getItem(storageKey) || 'zh'; } catch { /* Chinese remains the default. */ }
  setLanguage(language);
})();

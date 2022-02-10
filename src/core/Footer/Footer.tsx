/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, StylingProps } from '../utils';
import '@itwin/itwinui-css/css/footer.css';

export type TitleTranslations = {
  termsOfService: string;
  privacy: string;
  termsOfUse: string;
  cookies: string;
  legalNotices: string;
};

export type FooterProps = {
  /**
   * Customize footer elements.
   */
  customElements?: FooterElement[];
  /**
   * Provide localized strings.
   */
  translatedTitles?: TitleTranslations;
  /**
   * If true, only custom elements will be shown.
   */
  showOnlyCustomElements?: boolean;
} & StylingProps;

export type FooterElement = {
  /**
   * Title of the footer element.
   */
  title: string;
  /**
   * URL of the footer element.
   */
  url?: string;
};

const footerTranslations: TitleTranslations = {
  cookies: 'Cookies',
  legalNotices: 'Legal notices',
  privacy: 'Privacy',
  termsOfService: 'Terms of service',
  termsOfUse: 'Terms of use',
};

/**
 * Footer element with all needed legal and info links.
 * Be sure to place it manually at the bottom of your page.
 * You can use position 'absolute' with relative body or set the height of the content and place footer at the end.
 * @example
 * <Footer customElements={[{title: 'Bentley', url: 'https://www.bentley.com/'}]} />
 */
export const Footer = (props: FooterProps) => {
  const {
    customElements,
    translatedTitles,
    showOnlyCustomElements,
    className,
    ...rest
  } = props;

  useTheme();

  const today = new Date();
  const titles = { ...footerTranslations, ...translatedTitles };
  const defaultElements = [
    {
      title: titles.termsOfService,
      url:
        'https://connect-agreementportal.bentley.com/AgreementApp/Home/Eula/view/readonly/BentleyConnect',
    },
    { title: titles.privacy, url: 'https://www.bentley.com/en/privacy-policy' },
    {
      title: titles.termsOfUse,
      url:
        'https://www.bentley.com/en/terms-of-use-and-select-online-agreement',
    },
    { title: titles.cookies, url: 'https://www.bentley.com/en/cookie-policy' },
    { title: titles.legalNotices, url: 'https://connect.bentley.com/Legal' },
  ];

  let elements: FooterElement[] = [];
  if (!showOnlyCustomElements) {
    elements = elements.concat(defaultElements);
  }
  if (customElements) {
    elements = elements.concat(customElements);
  }

  return (
    <footer className={cx('iui-legal-footer', className)} {...rest}>
      <ul>
        {!showOnlyCustomElements && (
          <li>© {today.getFullYear()} Bentley Systems, Incorporated</li>
        )}
        {elements.map((element, index) => {
          return (
            <li key={`${element.title}-${index}`}>
              {!(showOnlyCustomElements && index < 1) && (
                <span className='iui-separator' />
              )}
              {element.url ? (
                <a href={element.url} target='_blank' rel='noreferrer'>
                  {element.title}
                </a>
              ) : (
                element.title
              )}
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, StylingProps } from '../utils';
import '@itwin/itwinui-css/css/footer.css';

export type TitleTranslations = {
  copyright: string;
  termsOfService: string;
  privacy: string;
  termsOfUse: string;
  cookies: string;
  legalNotices: string;
};

export type FooterProps = {
  /**
   * Customize footer elements.
   * Providing an array of FooterElements will append the custom elements to the end of the default elements.
   * Providing a function that returns an array of FooterElements allows further customization - whatever is returned from the function is displayed in the footer with no amendments.
   * @example Returning only custom elements
   * ```
   * <Footer customElements={() => newFooterElements)} />
   * ```
   * @example Filtering out a specific element
   * ```
   * <Footer customElements={(defaultElements: FooterElement[]) => defaultElements.filter(({ key }) => key !== 'privacy' )} />
   * ```
   * @example Changing a url
   * ```
   * <Footer customElements={(defaultElements: FooterElement[]) => defaultElements.map(element => ({ ...element, url: element.key === 'privacy' ? customPrivacyUrl : element.url }))} />
   * ```
   */
  customElements?:
    | FooterElement[]
    | ((defaultElements: FooterElement[]) => FooterElement[]);
  /**
   * Provide localized strings.
   */
  translatedTitles?: TitleTranslations;
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
  /**
   * Key of the footer element.
   */
  key?: keyof TitleTranslations;
};

const footerTranslations: TitleTranslations = {
  copyright: `© ${new Date().getFullYear()} Bentley Systems, Incorporated`,
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
  const { customElements, translatedTitles, className, ...rest } = props;

  useTheme();

  const titles = { ...footerTranslations, ...translatedTitles };
  const defaultElements: FooterElement[] = [
    {
      key: 'copyright',
      title: titles.copyright,
    },
    {
      key: 'termsOfService',
      title: titles.termsOfService,
      url:
        'https://connect-agreementportal.bentley.com/AgreementApp/Home/Eula/view/readonly/BentleyConnect',
    },
    {
      key: 'privacy',
      title: titles.privacy,
      url: 'https://www.bentley.com/en/privacy-policy',
    },
    {
      key: 'termsOfUse',
      title: titles.termsOfUse,
      url:
        'https://www.bentley.com/en/terms-of-use-and-select-online-agreement',
    },
    {
      key: 'cookies',
      title: titles.cookies,
      url: 'https://www.bentley.com/en/cookie-policy',
    },
    {
      key: 'legalNotices',
      title: titles.legalNotices,
      url: 'https://connect.bentley.com/Legal',
    },
  ];

  let elements: FooterElement[] = defaultElements;
  if (customElements) {
    elements =
      typeof customElements === 'function'
        ? customElements(defaultElements)
        : [...defaultElements, ...customElements];
  }

  return (
    <footer className={cx('iui-legal-footer', className)} {...rest}>
      <ul>
        {elements.map((element, index) => {
          return (
            <li key={`${element.title}-${index}`}>
              {index > 0 && <span className='iui-separator' />}
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

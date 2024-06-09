# Liccium Chrome Browser Extension

The Liccium Chrome browser extension allows users to verify declarations of digital media content online by performing a reverse-lookup of associated rights, metadata and verifiable credentials. The extension will draw information from Liccium registries, providing users with additional details about the media content and related assets. The Liccium browser extension will provide a straightforward and effective way for users to verify the authenticity and integrity of digital media content online, helping to establish trust in online publications, data, and information.

## How to use the browser extension?

Go to any website and click on the extension icon to verify content on this page. 

NOTE: Of course, you can only verify content that has been previously declared by a creator, rightsholder, or any other entity.

### Limitations

The browser extension is for testing purposes only. 
- It can only tested using the Chrome browser.
- Currently only images are supported. In future releases you will be able to verify all media types and formats. 

## How to make content declarations?

The test declarations have been published with the Liccium app, which is presently in its closed alpha phase. For those interested in experiencing and testing the app firsthand and joining as early adopters, you're welcome to register and request an invite code at [Liccium.com](https://Liccium.com).

## What is the Liccium?

**1. Verifiable declarations**  

With Liccium, content creators and rightsholders can digitally sign their original creative works and make publicly verifiable declarations of their original content. Liccium helps creators and rightsholders to generate, manage, and declare content-derived identifiers (ISCC codes) for digital media content. Using ISCC, they can inseparably bind verifiable claims – e.g. rights, license, and other product metadata – to the fingerprint of their digital content. All declarations are automatically accessible via the Liccium content registries, which allow users or machines to discover, identify, and verify the authenticity and integrity of digital media content and resolve rights, licenses, and other product metadata.

**2. Creator attribution**

Digital signatures and verifiable creator credentials increase trust in assertions, claims and the authenticity of the original content and help to sufficiently identify creators and rightsholders.

**3. ISCC (International Standard Content Code)**

Liccium is based on the ([International Standard Content Code (ISCC)](https://www.iso.org/standard/77899.html)), a content-derived identifier, lightweight fingerprinting, and open identification system for digital media content of all media types (image, video, text, audio),  using cryptographic and similarity- preserving hashes to create a unique ID for each digital asset.  

[ISO has published the ISCC as ISO 24138:2014](https://www.iso.org/standard/77899.html)

Using a novel standard for decentralised content identification, these claims inseparably stick with the content **without relying on watermarks or embedded metadata**. This empowers any user, system, or machine with access to the digital asset to independently generate an identical or similar ISCC code, enabling the identification, comparison, and matching of digital content while assessing its integrity and authenticity. Thus, ISCC remains dependable, retaining its full range of capabilities even in scenarios where content is altered or manipulated, or when watermarks, steganographic data, or metadata is removed from the media asset.

## Installation via Chrome Web Store

The Liccium browser extension can be installed via the Chrome web store:

[https://chromewebstore.google.com/detail/liccium/lkoiefagffheekoglghdblaeemembbjh](https://chromewebstore.google.com/detail/liccium/lkoiefagffheekoglghdblaeemembbjh)

## Installation via GitHub 

You can also install the browser extension manually. This requires a a few steps. Follow the instructions:

[Latest release](https://github.com/liccium/liccium-chrome-extension/releases)

1. Download the zip file of the [latest release](https://github.com/liccium/liccium-chrome-extension/releases).
2. Extract the zip file.
3. Place the extracted folder in any location.  
4. Start the Google Chrome browser.
5. Go to your Extensions page by entering **_chrome://extensions/_** into your Chrome browser. 
6. Enable the **_Developer mode_** on the top right.
7. Click on **"_Load unpacked_"**.
8. Select extracted **_liccium-chrome-extension[-version number]_** folder and enter. The folder _must not_ be deleted after extraction.
9. Go to the Extension settings and pin the Liccium Trust Engine browser extension.
10. Please refresh the browser window before first use.

## Liccium Browser Extension - Terms of Service (ToS)

> **This is the pre-release of the Liccium browser extension and for testing purposes only!**

By using The extension, you agree to these Terms of Service. Please read them carefully.

### Usage

The Liccium Browser extension is designed to allow users to find and verify declarations of digital media content online. Any misuse or malicious use of the extension is strictly prohibited.

### Verification & Authenticity

The Liccium Browser extension operates by capturing the URL of the online content and transmitting it to the server. This process facilitates the generation of an [ISCC code](https://iscc.codes) ([International Standard Content Code](https://www.iso.org/standard/77899.html)) specific to the content in question. Post ISCC generation, the extension queries the Liccium index to obtain relevant information. This index is rooted in content declarations on decentralized public blockchain networks. The derived information, including the ISCC and associated metadata, is then presented to the user, offering insights into the content's authenticity and declaration metadata.

### Privacy

We respect your privacy! The extension does not collect any personal data. To generate the ISCC code, the URL of the content is provided temporarily to the ISCC generator service, hosted on the servers. No IP address, no URL, no content is stored!

### Limitation of Liability

While we strive to provide accurate and timely information, there may be inadvertent technical or factual inaccuracies and typographical errors. We reserve the right to make corrections and changes to the extension at any time without notice.

### Updates

We may update the extension and these Terms of Service from time to time. It is your responsibility to check for updates regularly.

### Termination

We reserve the right to terminate or suspend access to the extension for any user who violates these Terms of Service.

### Governing Law

These Terms of Service are governed by Dutch law.

### Contact

For any questions or concerns regarding these Terms of Service, please contact us at werk at posth .me. By using the Liccium Browser extension, you agree to abide by these terms and conditions. If you do not agree with any of these terms, please do not use the extension.


## Credits

An early version of the extension was developed by [Dominik Krakau](https://github.com/dkrakau), [Lukas Amerkamp](https://github.com/lamerkamp), [Michael Sorban](https://github.com/msorban), and [Sebastian Posth](https://github.com/sposth) in collaboration with the [Institute for Internet Security](https://www.internet-sicherheit.de/) of the Westfalian University of Applied Science.  

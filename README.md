# Liccium Chrome Browser Extension

The Liccium Chrome browser plugin allows users to identify and verify declarations of digital media content online and perform a reverse-lookup of associated metadata, rights, and available or already acquired licences. 

The plugin will draw information from decentralised registries, which are (currently) based on content declarations on decentralised public blockchain networks, providing users with additional details about the media content and related assets.  

Overall, the Liccium browser plugin will provide a straightforward and effective way for users to verify the authenticity and accuracy of digital media content encountered while browsing the web, helping to establish trust in online publications, data, and information.

<img width="400" alt="image" src="https://1543071982-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FKyPjnRgFAp1MzuOXKSXI%2Fuploads%2FokEGb9HJrYaL3kpZ0Nx6%2FBrowser%20plugin%20small.gif?alt=media&token=489e7ea6-1a6a-4fad-b18d-7af0b50eb3f4">

## Credits

The plugin was developed by [Dominik Krakau](https://github.com/dkrakau), [Lukas Amerkamp](https://github.com/lamerkamp), [Michael Sorban](https://github.com/msorban), and [Sebastian Posth](https://github.com/sposth) in collaboration with the [Institute for Internet Security](https://www.internet-sicherheit.de/) of the Westfalian University of Applied Science. The backend technology is based on code, developed by [ISCC Foundation](https://github.com/iscc) and [Liccium B.V.](https://liccium.com), co-funded by [Trublo.eu](https://Trublo.eu) and the European Union’s Horizon 2020 research and innovation programme grant agreement No. 957228.  

<img width="200" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/d494868d-60c9-4ade-bb09-1f1df57bc538">

## How to use the browser plugin?

Go to any website and click on the extension icon to verify content on this page. 

NOTE: Of course, you can only verify content that has been previously declared by a creator, rightsholder, or any other entity.

### Limitations

The browser extension is for testing purposes only. 
- It can only tested using the Chrome browser
- Currently only declarations made on testnet blockchains can be analysed. 
- Currently only images are supported. In future releases you will be able to verify all media types and formats. 
 
## Test declarations

To test the browser plugin, you can use the examples of a few test declarations, below.  
Alternatively, you can find verifiable content posted by this Twitter account:

[https://twitter.com/spsth](https://twitter.com/spsth)

### Declarations by two verified declarants

<img width="400" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/3b2ab918-5523-4a96-ace5-badd816564df">

[https://photos.com/featured/eye-of-horse-gabriella-nonino.html](https://photos.com/featured/eye-of-horse-gabriella-nonino.html
) 

### Examples of fake/manipulated content

These example shows how to resolve the original declaration from manipulated content:

<img width="400" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/09ab9b0a-6423-4d81-a84d-e11463257ba1">

[https://twitter.com/spsth/status/1718594137702777111](https://twitter.com/spsth/status/1718594137702777111)

This was the original declaration – spot the difference :) 

<img width="400" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/38632fdd-9f70-4bd9-adee-405e224487cf">  

[https://bsky.app/profile/sandswimmer.xyz/post/3kcb6dwb4ck2r](https://bsky.app/profile/sandswimmer.xyz/post/3kcb6dwb4ck2r)  

This is the result of the reverse-lookup: 

<img width="400" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/bf66b58f-ada1-4db3-bd82-81a0fd1d030b">

Another fake image; the browser plugin will lead you to the original content:

<img width="400" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/39a5074b-fa3b-44eb-a0f7-0bd39007ea7a">

[https://twitter.com/spsth/status/1718591647087251519](https://twitter.com/spsth/status/1718591647087251519)

### Examples of AI generated content

These example shows how to verify AI generated content: 

<img width="400" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/c2c576bc-e3b1-4a17-b2df-1128dfd8b7fd">

[https://twitter.com/spsth/status/1723709427130257804](https://twitter.com/spsth/status/1723709427130257804)

<img width="400" alt="image" src="https://github.com/liccium/liccium-chrome-extension/assets/14913025/8c9bbddf-e712-43cb-be47-2cf177fd0792">

[https://twitter.com/spsth/status/1723712373431673208/photo/1](https://twitter.com/spsth/status/1723712373431673208/photo/1)

## How to make content declarations?

The test declarations have been published with the Liccium app, which is presently in its private alpha phase. For those interested in experiencing and testing the app firsthand and joining as early adopters, you're welcome to register and request an invite code at [Liccium.com](https://Liccium.com).

## What is the Liccium Trust Engine?

**1. Verifiable declarations**  

With Liccium, content creators and rightsholders can digitally sign their original creative works and make publicly verifiable declarations of their original content.

Liccium helps creators and rightsholders to generate, manage, and declare content-derived identifiers (ISCC codes) for digital media content. Using ISCC, they can inseparably bind verifiable claims – e.g. rights, license, and other product metadata – to the fingerprint of their digital content. 
All declarations are automatically accessible via decentralised content registries, which allow users or machines to discover, identify, and verify the authenticity and integrity of digital media content and resolve rights, licenses, and other product metadata.

**2. Creator attribution**

Digital signatures and verifiable creator credentials increase trust in assertions, claims and the authenticity of the original content and help to sufficiently identify creators and rightsholders.

**3. ISCC (International Standard Content Code)**

Liccium is based on the ([International Standard Content Code (ISCC)](https://www.iso.org/standard/77899.html)), a content-derived identifier, lightweight fingerprinting, and open identification system for digital media content of all media types (image, video, text, audio),  using cryptographic and similarity- preserving hashes to create a unique ID for each digital asset.  

[Current status of the ISCC at ISO: Draft International Standard ISO/PRF 24138](https://www.iso.org/standard/77899.html)

Using a novel standard for decentralised content identification, these claims inseparably stick with the content **without relying on watermarks or embedded metadata**. 

This empowers any user, system, or machine with access to the digital asset to independently generate an identical or similar ISCC code, enabling the identification, comparison, and matching of digital content while assessing its integrity and authenticity. Thus, ISCC remains dependable, retaining its full range of capabilities even in scenarios where content is altered or manipulated, or when watermarks, steganographic data, or metadata is removed from the media asset.

## Installation via Chrome Web Store

The Liccium browser extension can be installed via the Chrome web store:

[https://chromewebstore.google.com/detail/liccium-trust-engine/lkoiefagffheekoglghdblaeemembbjh](https://chromewebstore.google.com/detail/liccium-trust-engine/lkoiefagffheekoglghdblaeemembbjh)

## Installation via GitHub 

You can also install the browser extension manually. This requires a a few steps. Follow the instructions:

[Latest release](https://github.com/liccium/liccium-chrome-extension/releases)

1. Download the zip file of the [latest release](https://github.com/liccium/liccium-chrome-extension/releases).
2. Extract the zip file.
3. Place extracted folder in any location.  
4. Start the Google Chrome browser.
5. Go to your Extensions page by entering **_chrome://extensions/_** into your Chrome browser. 
6. Enable the **_Developer mode_** on the top right.
7. Click on **_Load unpacked_**.
8. Select extracted **_liccium-chrome-extension[-version number]_** folder and enter. The folder _must not_ be deleted after extraction.
9. Go to the Plugins settings and pin the Liccium Trust Engine browser extension.
10. Please refresh browser window befor first use. 

## Liccium Browser Plugin - Terms of Service (ToS)

> **This is the pre-release of the Liccium browser plugin and for testing purposes only!**

By using The plugin, you agree to these Terms of Service. Please read them carefully.

### Usage

The Liccium Browser Plugin is designed to allow users to find and verify declarations of digital media content online. Any misuse or malicious use of the plugin is strictly prohibited.

### Verification & Authenticity

The Liccium Browser Plugin operates by capturing the URL of the online content and transmitting it to the server. This process facilitates the generation of an [ISCC code](https://iscc.codes) ([International Standard Content Code](https://www.iso.org/standard/77899.html)) specific to the content in question. Post ISCC generation, the plugin queries the Liccium index to obtain relevant information. This index is rooted in content declarations on decentralized public blockchain networks. The derived information, including the ISCC and associated metadata, is then presented to the user, offering insights into the content's authenticity and declaration metadata.

### Privacy

We respect your privacy! The plugin does not collect any personal data. To generate the ISCC code, the URL of the content is provided temporarily to the ISCC generator service, hosted on the servers. No IP address, no URL, no content is stored!

### Limitation of Liability

While we strive to provide accurate and timely information, there may be inadvertent technical or factual inaccuracies and typographical errors. We reserve the right to make corrections and changes to the plugin at any time without notice.

### Updates

We may update the plugin and these Terms of Service from time to time. It is your responsibility to check for updates regularly.

### Termination

We reserve the right to terminate or suspend access to the plugin for any user who violates these Terms of Service.

### Governing Law

These Terms of Service are governed by Dutch law.

### Contact

For any questions or concerns regarding these Terms of Service, please contact us at werk at posth .me. By using the Liccium Browser Plugin, you agree to abide by these terms and conditions. If you do not agree with any of these terms, please do not use the plugin.


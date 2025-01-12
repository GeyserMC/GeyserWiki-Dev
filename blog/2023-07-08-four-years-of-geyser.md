---
title: Four Years of Geyser
slug: four-years-of-geyser
authors: RednedEpic
hide_table_of_contents: false
description: Geyser is now four years old!
crowdin_page_id: 67cfbd70-8366-42ed-b564-b84ed9ce65b5
---

Hi everyone,

Today is a super special day - it's Geyser's birthday 🥳. Geyser is now four years old and booyyy has it come a long way! This is a huge day for us and an incredible milestone. We're very proud of how far we've been able to come, the amount of servers Geyser has expanded the reach of, and the amazing community behind Geyser. Seeing millions of players being able to play with their Java friends is something I never dreamed Geyser would be able to do. The growth from day one has been amazing and we're all very grateful for everyone's support 💙 

Not only is this a special day because it's our birthday, but we have some exiting news and sneak peeks to share with you all, alongside general updates on our project development. Continue reading for more information!

<!-- truncate -->

## Project Statistics 
- Since the start of the project, there have been 3,337 commits contributed by 105 contributors
- As of just a few days ago, Geyser has hit 4,000 stars on GitHub, making it one of the top open-source Minecraft projects ever, and _the_ #1 Minecraft Bedrock project
- Our Discord server has continued to grow, now approaching 25,000 Discord members

![image](https://github.com/GeyserMC/GeyserBlog/assets/29153871/e2d83a49-aa94-46c4-b660-4bc150331818)

None of these would have been possible without our amazing community. To that, we owe a debt of gratitude for the years of support from all of you 💙

## Project Development
It's likely well-known by now that Geyser has hit a state of maturity. Since about 2021, Geyser has reached the point of full survival and creative playability for Bedrock clients on Java servers. This has allowed us to place much more focus on improving stability, fixing bugs and designing a resilient platform. We've spent the latter half of last year designing an API for Geyser, creating an extension system, and ultimately adding more for developers. A couple notable additions include custom item support and a resource pack API.

We've also made some major internal changes, one of the biggest being updating our Bedrock protocol library to version 3.0. This was a massive undertaking by the [CloudburstMC](https://github.com/CloudburstMC/) organization, which we work closely with. While a bit bumpy at first, these changes modernized the internal RakNet library and brought along some sweet network optimizations on the Bedrock side.

At a steady pace, we're also working on integrating Floodgate and Geyser together! While Floodgate will still exist as a separate project for proxy and standalone instances, we are working on shipping it inside Geyser to improve setup processes and reduce complexity when creating Geyser servers. One of our goals internally has been to make the Geyser setup as seamless as possible, and this is just one way we're doing that! We'll share more on this once it gets closer to completion.

## What's Next?
With Geyser being in a state of maturity in terms of vanilla compatibility, we're shifting our attention onto expanding all the "custom" features Bedrock supports. There's a huge and growing demand for utilizing many of Bedrock's custom features, such as resource packs, entities, blocks, items and UIs. One of our biggest goals going forward is to design a platform that allows developers and server owners to bring their server to the next level for Bedrock players.

### API Additions
Recently, we added a [resource pack loading API](https://github.com/GeyserMC/Geyser/pull/3696) which allows for developers to fine-tune and integrate their resource packs through the Geyser API, and are actively working on even more, such as [custom blocks](https://github.com/GeyserMC/Geyser/pull/3505) and [custom entities](https://github.com/GeyserMC/Geyser/pull/3754). These are just a few things we're doing inside the Geyser API, but that's not all we have in store!

### Resource Pack Conversion
Some of you who were around a few years ago may remember we used to maintain a resource pack conversion project. Well, we've decided to [revive this project](https://github.com/GeyserMC/PackConverter/tree/feature/refactor)! While we know that third party projects exist now and handle conversions fairly well, we're working to make this part of mainline Geyser to further simplify the work needed by server owners and plugin developers. This means that once the project is integrated into Geyser, pack conversion will happen automatically. Contributions are most certainly welcome and please do reach out on Discord if you'd like to get involved!

### Wait, there's more???
There is! And the exciting news is we're expanding Geyser to Forge! Of all the major platforms we support, Forge is one of the ones we do not support. We want to further expand the Geyser ecosystem, and I'm happy to announce that Geyser is coming to Forge in the next couple of weeks! This will also include some improvements to the Fabric platform as well. One such change is an integrated world manager, which exists only on Spigot platforms currently. This means Geyser will use the server to retrieve things such as blocks, significantly reducing the amount of RAM used for caching world data. 

Additionally, since the Forge and Fabric platforms will use a common codebase for 95% of everything, thanks to [Architectury](https://github.com/architectury/), we can update both platforms very easily and changes that happen to one in most cases will carry over to the other.

### One more thing...
Not only are we wanting to expand what Geyser can do with custom features on _vanilla_ servers, but there's a **lot** we want to do with both Fabric and Forge in the near future. Keep an eye out for further announcements over the next few weeks 👀🍰🥳 

![Minecraft 7_8_2023 2_15_26 PM](https://github.com/GeyserMC/GeyserBlog/assets/29153871/5f60d150-3081-4fe8-9dba-ce04d8edcd85)

And that's all I have to share for today! Once again, thank you all for your continued support over the years and we cannot wait to see the creativity you unleash on your server with these features! In typical Geyser fashion, here is a Gource render of all commits since the start of the project: [https://youtu.be/ss6GlUkVgEE](https://youtu.be/ss6GlUkVgEE)

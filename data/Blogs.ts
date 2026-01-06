import type { BlogPost } from "@/types/blog";

export const dummyBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React 18 and TypeScript",
    slug: "getting-started-with-react-18-and-typescript",
    excerpt:
      "Learn how to set up a modern React 18 application with TypeScript, featuring the latest concurrent features and best practices.",
    content: `
      <h2>Introduction to React 18</h2>
      <p>React 18 introduces powerful new features that redefine how developers build interactive web applications. From concurrent rendering to automatic batching, the latest version ensures smoother performance and improved user experiences.</p>
      
      <h3>Setting up React 18 with TypeScript</h3>
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      <p>This command initializes a new React app pre-configured with TypeScript, ensuring type safety and better tooling support. TypeScript helps catch potential issues during development, making your app more stable and maintainable.</p>

      <h3>New Features in React 18</h3>
      <ul>
        <li><strong>Concurrent Rendering:</strong> Allows React to prepare multiple UI updates in the background for smoother transitions.</li>
        <li><strong>Automatic Batching:</strong> Groups state updates automatically to reduce unnecessary re-renders.</li>
        <li><strong>Transitions API:</strong> Enhances user experience by differentiating urgent vs. non-urgent updates.</li>
        <li><strong>Suspense Improvements:</strong> Better support for data fetching and lazy loading of components.</li>
      </ul>

      <h3>Example: Using Concurrent Features</h3>
      <pre><code>
import { startTransition } from 'react';

function Search({ query }) {
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    startTransition(() => {
      setResults(filterData(e.target.value));
    });
  };
}
      </code></pre>

      <p>By wrapping updates in <code>startTransition</code>, React prioritizes urgent interactions like typing, while deferring non-critical updates.</p>

      <h3>Conclusion</h3>
      <p>React 18 and TypeScript form a powerful duo for building high-quality, type-safe web applications. Whether you're creating enterprise dashboards or SaaS platforms, these tools give you the flexibility and confidence to scale with ease.</p>
    `,
    featuredImage: "/images/blogs/react-typescript.jpg",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/authors/sarah-johnson.jpg",
      role: "Senior Frontend Developer",
    },
    categories: [
      { id: "1", name: "React", slug: "react" },
      { id: "2", name: "TypeScript", slug: "typescript" },
    ],
    tags: ["React", "TypeScript", "Frontend", "Web Development"],
    readTime: 8,
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isPublished: true,
    isFeatured: true,
    viewCount: 1245,
    likeCount: 89,
    commentCount: 23,
    metaDescription:
      "Learn how to set up React 18 with TypeScript and explore the latest features including concurrent rendering and automatic batching.",
    metaKeywords: ["React", "TypeScript", "Frontend", "Web Development"],
  },

  {
    id: "2",
    title: "Building Scalable Node.js Microservices",
    slug: "building-scalable-nodejs-microservices",
    excerpt:
      "A comprehensive guide to designing and implementing microservices architecture with Node.js, Docker, and Kubernetes.",
    content: `
      <h2>Understanding Microservices Architecture</h2>
      <p>Microservices are a modern architectural approach that breaks down monolithic applications into smaller, independently deployable services. Each service handles a specific business capability and communicates through APIs or messaging queues.</p>
      
      <h3>Benefits of Microservices</h3>
      <ul>
        <li><strong>Independent Deployment:</strong> Update or scale individual services without affecting others.</li>
        <li><strong>Fault Isolation:</strong> Failure in one service doesn’t crash the entire system.</li>
        <li><strong>Technology Flexibility:</strong> Different services can use different languages or frameworks.</li>
      </ul>

      <h3>Building Microservices with Node.js</h3>
      <pre><code>
import express from 'express';
const app = express();
app.get('/users', (req, res) => res.json({ message: <br/> 'User Service Running' }));
app.listen(4000, () => console.log('User Service on port <br/> 4000'));
      </code></pre>

      <p>Each service runs on a separate port or container, exposing REST APIs that communicate via HTTP or message queues (e.g., RabbitMQ, Kafka).</p>

      <h3>Containerization and Deployment</h3>
      <p>Using Docker and Kubernetes, you can containerize services for consistent deployments across environments. Kubernetes handles orchestration, scaling, and service discovery automatically.</p>

      <h3>Best Practices</h3>
      <ul>
        <li>Use API Gateways for routing and authentication</li>
        <li>Implement centralized logging and monitoring</li>
        <li>Ensure fault tolerance with retries and circuit breakers</li>
        <li>Automate CI/CD pipelines</li>
      </ul>

      <h3>Conclusion</h3>
      <p>Node.js microservices architecture provides the scalability and flexibility modern cloud applications require. Combined with Docker and Kubernetes, it forms the backbone of resilient and efficient systems.</p>
    `,
    featuredImage: "/images/blogs/nodejs-microservices.jpg",
    author: {
      name: "Mike Chen",
      avatar: "/images/authors/mike-chen.jpg",
      role: "Backend Architect",
    },
    categories: [
      { id: "3", name: "Node.js", slug: "nodejs" },
      { id: "4", name: "Microservices", slug: "microservices" },
    ],
    tags: ["Node.js", "Microservices", "Docker", "Kubernetes", "Backend"],
    readTime: 12,
    publishedAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    isPublished: true,
    isFeatured: true,
    viewCount: 892,
    likeCount: 67,
    commentCount: 15,
    metaDescription:
      "Learn how to build scalable microservices with Node.js, Docker, and Kubernetes for modern cloud-native applications.",
    metaKeywords: [
      "Node.js",
      "Microservices",
      "Docker",
      "Kubernetes",
      "Backend",
    ],
  },
  {
    id: "3",
    title: "Mastering Tailwind CSS for Modern UI Development",
    slug: "mastering-tailwind-css-for-modern-ui-development",
    excerpt:
      "Discover how Tailwind CSS revolutionizes UI design with utility-first classes, responsive design, and scalable styling techniques.",
    content: `
      <h2>Why Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework that enables rapid UI development without leaving your HTML. Unlike traditional frameworks like Bootstrap, Tailwind gives you full control over styling while maintaining design consistency and scalability.</p>

      <h3>Getting Started</h3>
      <pre><code>npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
      <p>After setup, include Tailwind in your <code>src/index.css</code> file:</p>
      <pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>

      <h3>Core Advantages</h3>
      <ul>
        <li><strong>Utility-first classes:</strong> Build layouts directly in your markup.</li>
        <li><strong>Responsive design:</strong> Use breakpoints like <code>sm:</code>, <code>md:</code>, <code>lg:</code> to adapt to any screen size.</li>
        <li><strong>Customization:</strong> Modify themes easily through <code>tailwind.config.js</code>.</li>
      </ul>

      <h3>Example: Responsive Hero Section</h3>
      <pre><code>
&lt;section class="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100"&gt;
  &lt;div&gt;
    &lt;h1 class="text-4xl font-bold mb-4"&gt;Build Smarter with Tailwind&lt;/h1&gt;
    &lt;p class="text-gray-600"&gt;A modern CSS framework that keeps you in flow.&lt;/p&gt;
  &lt;/div&gt;
  &lt;img src="/hero.svg" class="w-1/2 md:w-1/3" /&gt;
&lt;/section&gt;
      </code></pre>

      <h3>Performance & Best Practices</h3>
      <ul>
        <li>Enable <code>purge</code> in production to remove unused classes.</li>
        <li>Use component extraction with <code>@apply</code> for reusability.</li>
        <li>Integrate Tailwind with design systems using plugins.</li>
      </ul>

      <h3>Conclusion</h3>
      <p>Tailwind CSS empowers developers to build clean, scalable, and responsive UIs faster than ever. Its declarative approach aligns with modern development tools like React, Vue, and Next.js, making it an essential part of the modern frontend toolkit.</p>
    `,
    featuredImage: "/images/blogs/tailwind-css.jpg",
    author: {
      name: "Emily Roberts",
      avatar: "/images/authors/emily-roberts.jpg",
      role: "UI Engineer",
    },
    categories: [{ id: "5", name: "Frontend", slug: "frontend" }],
    tags: ["Tailwind", "CSS", "Frontend", "Design Systems"],
    readTime: 7,
    publishedAt: "2024-01-20T11:15:00Z",
    updatedAt: "2024-01-20T11:15:00Z",
    isPublished: true,
    isFeatured: false,
    viewCount: 657,
    likeCount: 52,
    commentCount: 9,
    metaDescription:
      "Master Tailwind CSS and learn how to build modern, scalable, and responsive UIs faster with utility-first design principles.",
    metaKeywords: [
      "Tailwind",
      "CSS",
      "Frontend",
      "UI Design",
      "Responsive Web",
    ],
  },

  {
    id: "4",
    title: "AI in the Browser: TensorFlow.js for Real-Time Intelligence",
    slug: "ai-in-the-browser-tensorflowjs-for-real-time-intelligence",
    excerpt:
      "Explore how TensorFlow.js enables machine learning directly in the browser for tasks like image recognition, natural language processing, and predictions.",
    content: `
      <h2>Introduction</h2>
      <p>TensorFlow.js allows you to train and run machine learning models directly in the browser using JavaScript. This unlocks real-time AI applications that don’t depend on backend servers, improving privacy and speed.</p>

      <h3>Setting Up TensorFlow.js</h3>
      <pre><code>npm install @tensorflow/tfjs</code></pre>
      <p>Import TensorFlow into your app:</p>
      <pre><code>import * as tf from '@tensorflow/tfjs';</code></pre>

      <h3>Example: Image Classification</h3>
      <pre><code>
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

async function classifyImage(imgElement) {
  const model = await mobilenet.load();
  const predictions = await model.classify(imgElement);
  console.log(predictions);
}
      </code></pre>
      <p>This simple example loads a pre-trained MobileNet model to recognize objects from an image element on your webpage.</p>

      <h3>Real-Time Use Cases</h3>
      <ul>
        <li>Gesture recognition for interactive interfaces</li>
        <li>Face detection in authentication systems</li>
        <li>Predictive text and chatbots</li>
        <li>Health monitoring via webcam data</li>
      </ul>

      <h3>Performance Tips</h3>
      <ul>
        <li>Use WebGL backend for faster GPU acceleration.</li>
        <li>Quantize models to reduce memory footprint.</li>
        <li>Run inference asynchronously to avoid UI blocking.</li>
      </ul>

      <h3>Conclusion</h3>
      <p>TensorFlow.js bridges AI and web development, making it possible to build intelligent, real-time browser applications. It’s the perfect tool for developers bringing machine learning directly to users’ fingertips.</p>
    `,
    featuredImage: "/images/blogs/tensorflowjs.jpg",
    author: {
      name: "David Kim",
      avatar: "/images/authors/david-kim.jpg",
      role: "AI Engineer",
    },
    categories: [{ id: "6", name: "AI/ML", slug: "ai-ml" }],
    tags: ["AI", "TensorFlow.js", "Machine Learning", "Web Development"],
    readTime: 9,
    publishedAt: "2024-02-03T09:00:00Z",
    updatedAt: "2024-02-03T09:00:00Z",
    isPublished: true,
    isFeatured: true,
    viewCount: 1143,
    likeCount: 78,
    commentCount: 18,
    metaDescription:
      "Learn how to use TensorFlow.js to bring AI models into your web browser for real-time predictions and interactive intelligence.",
    metaKeywords: [
      "TensorFlow.js",
      "AI",
      "Machine Learning",
      "Web Development",
    ],
  },

  {
    id: "5",
    title: "Optimizing Databases for Performance and Scalability",
    slug: "optimizing-databases-for-performance-and-scalability",
    excerpt:
      "Learn proven techniques for improving database query speed, indexing strategies, and architecture for scalable applications.",
    content: `
      <h2>Understanding Database Performance</h2>
      <p>As your application grows, database performance becomes critical. Poor indexing, inefficient queries, and lack of caching can slow your system drastically.</p>

      <h3>Indexing for Speed</h3>
      <p>Indexes improve query speed by allowing the database to locate data faster.</p>
      <pre><code>CREATE INDEX idx_users_email ON users(email);</code></pre>
      <p>However, excessive indexing can slow down inserts and updates — balance is key.</p>

      <h3>Query Optimization</h3>
      <ul>
        <li>Use <code>EXPLAIN</code> to analyze query plans.</li>
        <li>Avoid <code>SELECT *</code> — query only required fields.</li>
        <li>Normalize to reduce redundancy, denormalize for read-heavy systems.</li>
      </ul>

      <h3>Caching Strategies</h3>
      <p>Use Redis or Memcached to cache frequent queries and reduce load on primary databases.</p>

      <h3>Scaling Approaches</h3>
      <ul>
        <li><strong>Vertical scaling:</strong> Increase server resources.</li>
        <li><strong>Horizontal scaling:</strong> Shard or replicate databases across nodes.</li>
        <li><strong>Connection pooling:</strong> Reuse database connections for efficiency.</li>
      </ul>

      <h3>Monitoring</h3>
      <p>Track metrics such as query latency, lock contention, and I/O throughput to detect bottlenecks early.</p>

      <h3>Conclusion</h3>
      <p>Database optimization isn’t a one-time task — it’s an ongoing process. Continuous monitoring, indexing, and caching ensure your systems remain fast and reliable as they scale.</p>
    `,
    featuredImage: "/images/blogs/database-optimization.jpg",
    author: {
      name: "Anita Patel",
      avatar: "/images/authors/anita-patel.jpg",
      role: "Data Engineer",
    },
    categories: [{ id: "7", name: "Backend", slug: "backend" }],
    tags: ["Database", "Optimization", "SQL", "Performance", "Scalability"],
    readTime: 10,
    publishedAt: "2024-02-15T12:30:00Z",
    updatedAt: "2024-02-15T12:30:00Z",
    isPublished: true,
    isFeatured: false,
    viewCount: 948,
    likeCount: 63,
    commentCount: 11,
    metaDescription:
      "Master database optimization techniques including indexing, caching, and query tuning for scalable backend performance.",
    metaKeywords: [
      "Database",
      "Optimization",
      "Performance",
      "SQL",
      "Scalability",
    ],
  },

  {
    id: "6",
    title: "Building Progressive Web Apps (PWAs) with Next.js",
    slug: "building-progressive-web-apps-with-nextjs",
    excerpt:
      "A step-by-step guide to building fast, offline-capable, and installable Progressive Web Apps using Next.js and modern APIs.",
    content: `
      <h2>What Makes PWAs Special?</h2>
      <p>Progressive Web Apps combine the best of web and mobile — they work offline, load instantly, and can be installed like native apps. With Next.js, implementing these features is efficient and elegant.</p>

      <h3>Setting Up a Next.js PWA</h3>
      <pre><code>npm install next-pwa</code></pre>
      <p>Then update <code>next.config.js</code>:</p>
      <pre><code>
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});
module.exports = withPWA({
  reactStrictMode: true,
});
      </code></pre>

      <h3>Adding a Manifest</h3>
      <p>Create <code>public/manifest.json</code>:</p>
      <pre><code>
{
  "name": "AkiliNova PWA",
  "short_name": "AkiliNova",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#001B44",
  "theme_color": "#F5C542",
  "icons": [
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
      </code></pre>

      <h3>Offline Support</h3>
      <p>The service worker automatically caches static assets and pages, allowing your app to function even without internet access.</p>

      <h3>Benefits of Next.js PWAs</h3>
      <ul>
        <li>Improved loading speed and reliability</li>
        <li>Increased user engagement through installability</li>
        <li>SEO benefits via SSR and static generation</li>
      </ul>

      <h3>Conclusion</h3>
      <p>Next.js makes building PWAs straightforward. With server-side rendering, caching, and offline capabilities, you can deliver native-like experiences while maintaining the flexibility of the web.</p>
    `,
    featuredImage: "/images/blogs/nextjs-pwa.jpg",
    author: {
      name: "Lucas Martinez",
      avatar: "/images/authors/lucas-martinez.jpg",
      role: "Full Stack Developer",
    },
    categories: [
      { id: "8", name: "Next.js", slug: "nextjs" },
      { id: "9", name: "Frontend", slug: "frontend" },
    ],
    tags: ["Next.js", "PWA", "Web Development", "Performance", "Offline Apps"],
    readTime: 9,
    publishedAt: "2024-03-02T10:45:00Z",
    updatedAt: "2024-03-02T10:45:00Z",
    isPublished: true,
    isFeatured: true,
    viewCount: 1320,
    likeCount: 104,
    commentCount: 26,
    metaDescription:
      "Learn how to build Progressive Web Apps (PWAs) with Next.js to deliver fast, reliable, and offline-capable web experiences.",
    metaKeywords: [
      "Next.js",
      "PWA",
      "Web Development",
      "Offline",
      "Performance",
    ],
  },
];

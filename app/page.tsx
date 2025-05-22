"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  Bookmark,
  Check,
  Code,
  Copy,
  Download,
  Eye,
  EyeOff,
  Facebook,
  FileText,
  Globe,
  Grid,
  ImageIcon,
  Italic,
  Laptop,
  Layers,
  Layout,
  LayoutDashboard,
  Link,
  Lock,
  Mail,
  MapPin,
  Maximize,
  Menu,
  Palette,
  PanelLeft,
  PanelRight,
  Plus,
  Redo,
  Rocket,
  Save,
  Settings,
  Smartphone,
  Square,
  Star,
  Trash,
  Type,
  Underline,
  Undo,
  Unlock,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Custom icon components
const Minus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

type DroppedElement = {
  id: number;
  type: string;
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
  textAlignment: "left" | "center" | "right";
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
  padding: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  width: number;
  height: number;
  opacity: number;
};

export default function Home() {
  const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [editorMode, setEditorMode] = useState("desktop");
  const [showGrid, setShowGrid] = useState(false);
  const [showRulers, setShowRulers] = useState(false);
  const [selectedElement, setSelectedElement] = useState<DroppedElement | null>(
    null
  );
  const [websiteName, setWebsiteName] = useState("");
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showToolbox, setShowToolbox] = useState(true);
  const [activeTab, setActiveTab] = useState("elements");
  const [propertyTab, setPropertyTab] = useState("content");
  const [templateCategory, setTemplateCategory] = useState("all");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [elementInitialSize, setElementInitialSize] = useState({
    width: 0,
    height: 0,
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const templates = [
    {
      id: 1,
      name: "Business Pro",
      category: "business",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "portfolio",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      name: "Restaurant Deluxe",
      category: "restaurant",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 4,
      name: "E-Commerce Plus",
      category: "ecommerce",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 5,
      name: "Blog Standard",
      category: "blog",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 6,
      name: "Tech Startup",
      category: "business",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 7,
      name: "Fitness Studio",
      category: "health",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 8,
      name: "Educational Institute",
      category: "education",
      image: "/placeholder.svg?height=120&width=200",
    },
  ];

  const filteredTemplates =
    templateCategory === "all"
      ? templates
      : templates.filter((t) => t.category === templateCategory);

  const elements = [
    { id: "heading", name: "Heading", icon: Type },
    { id: "text", name: "Text Block", icon: FileText },
    { id: "image", name: "Image", icon: ImageIcon },
    { id: "button", name: "Button", icon: Square },
    { id: "contact", name: "Contact Form", icon: Mail },
    { id: "social", name: "Social Icons", icon: Facebook },
    { id: "divider", name: "Divider", icon: Minus },
    { id: "html", name: "Custom HTML", icon: Code },
  ];

  const sections = [
    { id: "header", name: "Header", icon: Menu },
    { id: "hero", name: "Hero Section", icon: Star },
    { id: "features", name: "Features Grid", icon: Grid },
    { id: "gallery", name: "Image Gallery", icon: ImageIcon },
    { id: "testimonials", name: "Testimonials", icon: MessageSquare },
    { id: "pricing", name: "Pricing Table", icon: DollarSign },
    { id: "contact", name: "Contact Section", icon: Mail },
    { id: "footer", name: "Footer", icon: Layout },
  ];

  const savedBlocks = [
    { id: "block1", name: "Hero with CTA", icon: Star },
    { id: "block2", name: "Feature Cards", icon: Grid },
    { id: "block3", name: "Contact Form", icon: Mail },
  ];

  const layers = [
    {
      id: "layer1",
      name: "Header",
      type: "section",
      locked: false,
      visible: true,
    },
    {
      id: "layer2",
      name: "Hero Section",
      type: "section",
      locked: false,
      visible: true,
    },
    {
      id: "layer3",
      name: "Heading",
      type: "element",
      locked: false,
      visible: true,
      parent: "layer2",
    },
    {
      id: "layer4",
      name: "Text Block",
      type: "element",
      locked: false,
      visible: true,
      parent: "layer2",
    },
    {
      id: "layer5",
      name: "Button",
      type: "element",
      locked: false,
      visible: true,
      parent: "layer2",
    },
    {
      id: "layer6",
      name: "Features ction",
      type: "section",
      locked: false,
      visible: true,
    },
  ];

  const history = [
    { id: 1, action: "Added Hero Section", time: "2 mins ago" },
    { id: 2, action: "Changed Heading Text", time: "1 min ago" },
    { id: 3, action: "Resized Image", time: "30 secs ago" },
    { id: 4, action: "Changed Button Color", time: "Just now" },
  ];

  // Drag and Drop Function
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("type");
    if (!type || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create new element with complete property set
    const newElement: DroppedElement = {
      id: Date.now(),
      type,
      x,
      y,
      text:
        type === "heading"
          ? "Sample Heading"
          : type === "text"
          ? "This is a sample text block. You can edit this text in the properties panel."
          : type === "button"
          ? "Click Me"
          : "Sample Text",
      fontSize: type === "heading" ? 24 : 16,
      color: type === "button" ? "#ffffff" : "#1e40af",
      backgroundColor: type === "button" ? "#2563eb" : "#dbeafe",
      textAlignment: "left",
      isBold: type === "heading" || type === "button",
      isItalic: false,
      isUnderlined: false,
      padding: type === "button" ? 12 : 8,
      borderRadius: 4,
      borderWidth: 0,
      borderColor: "#d4d4d8",
      width: type === "text" ? 300 : 0,
      height: 0,
      opacity: 100,
    };

    // Add the new element to the list
    setDroppedElements((prev) => [...prev, newElement]);
  };

  // Add these new handlers for dragging elements on the canvas
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isResizing) {
      handleResize(e);
      return;
    }

    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    // Update only the dragged element's position
    setDroppedElements((elements) =>
      elements.map((el) =>
        el.id === selectedElement.id ? { ...el, x, y } : el
      )
    );

    // Update selected element reference to reflect position changes
    setSelectedElement((prev) => (prev ? { ...prev, x, y } : null));
  };

  // Handle resize end
  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection("");
  };

  // Handle canvas mouse up
  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    handleResizeEnd();
  };

  // useEffect to initialize properties when a new element is selected
  useEffect(() => {
    if (selectedElement) {
      // No need to set individual states anymore since we're using the element's own properties
      // The properties are now stored in the element object itself
    }
  }, [selectedElement?.id]);

  // Function to update element properties with proper type safety
  const updateElementProperty = (
    property: keyof DroppedElement,
    value: any
  ) => {
    if (!selectedElement) return;

    // Update the element in the droppedElements array
    setDroppedElements((elements) =>
      elements.map((el) =>
        el.id === selectedElement.id ? { ...el, [property]: value } : el
      )
    );

    // Update the selected element reference to reflect changes
    setSelectedElement((prev) =>
      prev ? { ...prev, [property]: value } : null
    );
  };

  // Handle resize start with proper initialization
  const handleResizeStart = (
    e: React.MouseEvent,
    element: DroppedElement,
    direction: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setIsResizing(true);
    setResizeDirection(direction);
    setSelectedElement(element);
    setResizeStartPos({ x: e.clientX, y: e.clientY });

    // Get current element dimensions
    const elementRect = (
      e.currentTarget.parentNode as HTMLElement
    ).getBoundingClientRect();
    setElementInitialSize({
      width: elementRect.width,
      height: elementRect.height,
    });
  };

  // Handle element resize with proper dimension updates
  const handleResize = (e: React.MouseEvent) => {
    if (!isResizing || !selectedElement) return;

    const deltaX = e.clientX - resizeStartPos.x;
    const deltaY = e.clientY - resizeStartPos.y;

    let updates: Partial<DroppedElement> = {};

    if (resizeDirection.includes("e")) {
      updates.width = Math.max(20, elementInitialSize.width + deltaX);
    }
    if (resizeDirection.includes("s")) {
      updates.height = Math.max(20, elementInitialSize.height + deltaY);
    }
    if (resizeDirection.includes("w")) {
      const newWidth = Math.max(20, elementInitialSize.width - deltaX);
      updates.width = newWidth;
      updates.x = selectedElement.x + (elementInitialSize.width - newWidth);
    }
    if (resizeDirection.includes("n")) {
      const newHeight = Math.max(20, elementInitialSize.height - deltaY);
      updates.height = newHeight;
      updates.y = selectedElement.y + (elementInitialSize.height - newHeight);
    }

    // Apply all updates at once to avoid multiple re-renders
    setDroppedElements((elements) =>
      elements.map((el) =>
        el.id === selectedElement.id ? { ...el, ...updates } : el
      )
    );

    // Update selected element reference to reflect all changes
    setSelectedElement((prev) => (prev ? { ...prev, ...updates } : null));
  };

  // Helper to get element style based on its own properties
  const getElementStyle = (element: DroppedElement) => {
    const isSelected = selectedElement?.id === element.id;

    // Base styles using element's own properties
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      left: element.x,
      top: element.y,
      cursor:
        isDragging && selectedElement?.id === element.id ? "grabbing" : "grab",
      zIndex: isSelected ? 10 : 1,
      padding: `${element.padding}px`,
      borderRadius: `${element.borderRadius}px`,
      border:
        element.borderWidth > 0
          ? `${element.borderWidth}px solid ${element.borderColor}`
          : "none",
      opacity: element.opacity / 100,
      width: element.width > 0 ? `${element.width}px` : "auto",
      height: element.height > 0 ? `${element.height}px` : "auto",
    };

    // Type-specific styles using element's own properties
    switch (element.type) {
      case "heading":
      case "text":
      case "Text":
        return {
          ...baseStyle,
          backgroundColor: element.backgroundColor,
          color: element.color,
          fontWeight: element.isBold ? "bold" : "normal",
          fontStyle: element.isItalic ? "italic" : "normal",
          textDecoration: element.isUnderlined ? "underline" : "none",
          fontSize:
            element.type === "heading" ? `${element.fontSize}px` : "16px",
          maxWidth:
            element.type === "text" && element.width === 0 ? "300px" : "none",
          textAlign: element.textAlignment,
        };
      case "button":
      case "Button":
        return {
          ...baseStyle,
          backgroundColor: element.backgroundColor,
          color: element.color,
          border: "none",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(37, 99, 235, 0.5)",
        };
      case "image":
      case "Image":
        return {
          ...baseStyle,
          padding: 0,
          width: element.width > 0 ? `${element.width}px` : "100px",
          height: element.height > 0 ? `${element.height}px` : "100px",
          objectFit: "cover" as "cover",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: element.backgroundColor || "#4b5563",
          color: element.color || "white",
          border: "none",
          fontSize: "14px",
        };
    }
  };

  // Handle element mouse down with proper type safety
  const handleElementMouseDown = (
    e: React.MouseEvent,
    element: DroppedElement
  ) => {
    if (e.button !== 0) return; // Only left mouse button

    e.preventDefault();
    e.stopPropagation();

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });

    // Find and select the exact element from droppedElements
    const currentElement = droppedElements.find((el) => el.id === element.id);
    setSelectedElement(currentElement || null);
  };

  // Handle canvas click to deselect elements
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedElement(null);
    }
  };

  // Modified renderElement function to ensure complete isolation
  const renderElement = (element: DroppedElement) => {
    const elementStyle = getElementStyle(element);
    const isElementSelected = selectedElement?.id === element.id;

    // Common props for all elements
    const commonProps = {
      key: element.id,
      style: elementStyle,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        // Find the exact element from droppedElements to ensure we have latest state
        const currentElement = droppedElements.find(
          (el) => el.id === element.id
        );
        setSelectedElement(currentElement || null);
      },
      onMouseDown: (e: React.MouseEvent) => handleElementMouseDown(e, element),
    };

    // Resize handles for selected elements
    const resizeHandles = isElementSelected ? (
      <>
        <div
          className="absolute top-0 left-0 w-3 h-3 bg-violet-500 rounded-full cursor-nw-resize z-20 -translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "nw")}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 bg-violet-500 rounded-full cursor-ne-resize z-20 translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "ne")}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3 bg-violet-500 rounded-full cursor-sw-resize z-20 -translate-x-1/2 translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "sw")}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 bg-violet-500 rounded-full cursor-se-resize z-20 translate-x-1/2 translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "se")}
        />
        <div
          className="absolute top-0 left-1/2 w-3 h-3 bg-violet-500 rounded-full cursor-n-resize z-20 -translate-y-1/2 -translate-x-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "n")}
        />
        <div
          className="absolute bottom-0 left-1/2 w-3 h-3 bg-violet-500 rounded-full cursor-s-resize z-20 translate-y-1/2 -translate-x-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "s")}
        />
        <div
          className="absolute left-0 top-1/2 w-3 h-3 bg-violet-500 rounded-full cursor-w-resize z-20 -translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "w")}
        />
        <div
          className="absolute right-0 top-1/2 w-3 h-3 bg-violet-500 rounded-full cursor-e-resize z-20 translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, element, "e")}
        />
      </>
    ) : null;

    // Render appropriate element based on type
    switch (element.type) {
      case "heading":
        return (
          <div className="relative" key={element.id}>
            <p {...commonProps}>{element.text}</p>
            {resizeHandles}
          </div>
        );
      case "text":
        return (
          <div className="relative" key={element.id}>
            <p {...commonProps}>{element.text}</p>
            {resizeHandles}
          </div>
        );
      case "image":
      case "Image":
        return (
          <div className="relative" key={element.id}>
            <img
              src="https://via.placeholder.com/100"
              alt="Dropped"
              {...commonProps}
            />
            {resizeHandles}
          </div>
        );
      case "button":
      case "Button":
        return (
          <div className="relative" key={element.id}>
            <button {...commonProps}>{element.text}</button>
            {resizeHandles}
          </div>
        );
      case "Text":
        return (
          <div className="relative" key={element.id}>
            <p {...commonProps}>{element.text}</p>
            {resizeHandles}
          </div>
        );
      default:
        // For sections, blocks, or other elements, render a placeholder
        return (
          <div className="relative" key={element.id}>
            <div {...commonProps}>{element.text || element.type}</div>
            {resizeHandles}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-transparent" />
        <div className="absolute top-0 left-0 w-full h-full"></div>
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-transparent container mx-auto px-4 py-6 flex flex-col lg:flex-row min-h-screen">
        {step < 4 && (
          <>
            {/* Left Column */}
            <div className="lg:w-2/5  lg:pr-10 mb-10 lg:mb-0">
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-cyan-400">
                    Websites.co.in
                  </h1>
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-cyan-400">
                  {step === 1
                    ? "Sign Up Today and Access! All the Special Benefits"
                    : step === 2
                    ? "Design Your Digital Identity"
                    : step === 3
                    ? "Ready for Launch"
                    : "Customize Your Website"}
                </h2>
                <p className="text-gray-500 mb-8">
                  {step === 1
                    ? "Join the next generation of web presence with our AI-powered platform. Register now to access all premium features."
                    : step === 2
                    ? "Customize your website details to create a unique digital experience that represents your brand."
                    : step === 3
                    ? "Your website is ready to go live. Just one final check before launching into the digital universe."
                    : "Use our advanced drag-and-drop editor to create a stunning website that stands out."}
                </p>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-violet-600 backdrop-blur-sm border border-violet-500/20 rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-2 rounded">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        Lightning-Fast Setup
                      </h3>
                      <p className="text-gray-200">
                        You can have your website up and running in just 2
                        minutes flat! No more waiting around.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-violet-600 backdrop-blur-sm border border-violet-500/20 rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-2 rounded">
                      <Download className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        4 million+ downloads
                      </h3>
                      <p className="text-gray-200">
                        Connect with a large, active community of like minded
                        individuals and businesses.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-violet-600 backdrop-blur-sm border border-violet-500/20 rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-2 rounded">
                      <LayoutDashboard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        Easy-to-Use Dashboard
                      </h3>
                      <p className="text-gray-200">
                        Manage all aspects of your website from an intuitive,
                        user-friendly dashboard.
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Right Column - Form */}
            <div className="lg:w-3/5 lg:pl-10">
              <div className="bg-white  border-2 border-violet-500/20 rounded-2xl p-6 md:p-8">
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          step >= 1
                            ? "bg-gradient-to-r from-violet-600 to-blue-600"
                            : "bg-gray-700"
                        }`}
                      >
                        {step > 1 ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <span className="text-white font-medium">1</span>
                        )}
                      </div>
                      <div
                        className={`h-1 w-12 md:w-24 ${
                          step > 1
                            ? "bg-gradient-to-r from-blue-600 to-violet-600"
                            : "bg-gray-700"
                        }`}
                      ></div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          step >= 2
                            ? "bg-gradient-to-r from-violet-600 to-blue-600"
                            : "bg-gray-700"
                        }`}
                      >
                        {step > 2 ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <span className="text-white font-medium">2</span>
                        )}
                      </div>
                      <div
                        className={`h-1 w-12 md:w-24 ${
                          step > 2
                            ? "bg-gradient-to-r from-blue-600 to-violet-600"
                            : "bg-gray-700"
                        }`}
                      ></div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          step >= 3
                            ? "bg-gradient-to-r from-violet-600 to-blue-600"
                            : "bg-gray-700"
                        }`}
                      >
                        {step > 3 ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <span className="text-white font-medium">3</span>
                        )}
                      </div>
                      <div
                        className={`h-1 w-12 md:w-24 ${
                          step > 3
                            ? "bg-gradient-to-r from-blue-600 to-violet-600"
                            : "bg-gray-700"
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        step >= 4
                          ? "bg-gradient-to-r from-violet-600 to-blue-600"
                          : "bg-gray-700"
                      }`}
                    >
                      <span className="text-white font-medium">4</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Register</span>
                    <span>Details</span>
                    <span>Launch</span>
                    <span>Customize</span>
                  </div>
                </div>

                {/* Step 1: Registration Form */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-6">
                      Create Your Account
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-gray-500">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          className="bg-transparent text-black  rounded"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-400">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="bg-transparent text-black  rounded"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label
                            htmlFor="countryCode"
                            className="text-gray-500"
                          >
                            Country
                          </Label>
                          <Select defaultValue="+91">
                            <SelectTrigger className="bg-transparent text-black  rounded">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border border-violet-500/30">
                              <SelectItem value="+91">+91 (IN)</SelectItem>
                              <SelectItem value="+1">+1 (US)</SelectItem>
                              <SelectItem value="+44">+44 (UK)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="phone" className="text-gray-500">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            className="bg-transparent text-black  rounded"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="password" className="text-gray-500">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a secure password"
                            className="bg-transparent text-black  rounded pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          onClick={nextStep}
                          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded"
                        >
                          Sign Up for Free
                        </Button>
                      </div>
                      <p className="text-xs text-center text-gray-500">
                        By signing up, you agree to our{" "}
                        <a
                          href="#"
                          className="text-violet-400 hover:text-violet-300"
                        >
                          Terms
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-violet-400 hover:text-violet-300"
                        >
                          Privacy Policy
                        </a>
                      </p>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-2/5 border-t z-0 border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-2 mx-2 z-10 text-gray-400">
                            OR
                          </span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-end">
                          <div className="w-2/5 border-t z-0 border-gray-700"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            className="border-violet-500/30  hover:bg-violet-500/10 w-fit rounded text-white"
                          >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            Sign up with Google
                          </Button>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            className="border-violet-500/30 hover:bg-violet-500/10 w-fit rounded text-white"
                          >
                            <svg
                              className="mr-2 h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                            </svg>
                            Sign up with Meta
                          </Button>
                        </div>
                      </div>

                      <p className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <a
                          href="#"
                          className="text-violet-400 hover:text-violet-300"
                        >
                          Login
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Website Details Form */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-6">
                      Submit Website Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="websiteTitle" className="text-gray-500">
                          Website Title{" "}
                          <span className="text-violet-500">*</span>
                        </Label>
                        <Input
                          id="websiteTitle"
                          placeholder="Enter your Website Title/Business Name/Store Name/Blog Name"
                          className="bg-transparent text-black  rounded"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter your Website Title/Business Name/Store Name/Blog
                          Name
                        </p>
                      </div>

                      <div>
                        <Label
                          htmlFor="businessCategory"
                          className="text-gray-500"
                        >
                          Business Category{" "}
                          <span className="text-violet-500">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-transparent text-black  rounded">
                            <SelectValue placeholder="Select business category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded  border border-violet-500/30">
                            <SelectItem value="local">
                              LOCAL BUSINESS
                            </SelectItem>
                            <SelectItem value="ecommerce">
                              E-COMMERCE
                            </SelectItem>
                            <SelectItem value="blog">BLOG</SelectItem>
                            <SelectItem value="portfolio">PORTFOLIO</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">
                          Select the category in which your website operates
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="subdomain" className="text-gray-500">
                          Your Free Website Sub-domain
                        </Label>
                        <div className="flex">
                          <Input
                            id="subdomain"
                            placeholder="yourwebsite"
                            className="bg-transparent text-black  rounded rounded-r-none"
                            value={websiteName}
                            onChange={(e) => setWebsiteName(e.target.value)}
                          />
                          <div className="flex items-center px-3 border border-l-0 border-black rounded-r  text-gray-500">
                            .websites.co.in
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Upgradable to your own .com/.org/.in etc domain upon
                          finishing the registration process
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label
                            htmlFor="countryCode2"
                            className="text-gray-500"
                          >
                            Country Code
                          </Label>
                          <Select defaultValue="+91">
                            <SelectTrigger className="bg-transparent text-black  rounded">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded border border-black">
                              <SelectItem value="+91">+91 (IN)</SelectItem>
                              <SelectItem value="+1">+1 (US)</SelectItem>
                              <SelectItem value="+44">+44 (UK)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="phone2" className="text-gray-500">
                            Phone Number
                          </Label>
                          <Input
                            id="phone2"
                            placeholder="Enter your phone number"
                            className="bg-transparent text-black  rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="city" className="text-gray-500">
                          Select City <span className="text-violet-500">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-transparent text-black  rounded">
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent className=" bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded">
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="bangalore">Bangalore</SelectItem>
                            <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">
                          Enter your current location so that nearby visitors
                          can find you on search engines
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-gray-500">
                          Enter Postal Address
                        </Label>
                        <Input
                          id="address"
                          placeholder="Enter your full address"
                          className="bg-transparent text-black  rounded"
                        />
                      </div>

                      <div>
                        <Label htmlFor="postalCode" className="text-gray-500">
                          Enter Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          placeholder="Enter your postal code"
                          className="bg-transparent text-black  rounded"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Type your postal code in the box below so we can
                          personalize your experience
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="showAddress" />
                        <Label
                          htmlFor="showAddress"
                          className="text-gray-500 text-sm"
                        >
                          Show address on your website
                        </Label>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          onClick={prevStep}
                          variant="outline"
                          className="border-violet-500/30 hover:bg-violet-500/10 rounded text-white"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={nextStep}
                          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded text-white"
                        >
                          Create Website
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-10"
                  >
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 mb-6">
                      <Check className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      Your Website is Ready!
                    </h3>
                    <p className="text-gray-400 mb-8">
                      Your digital presence is now live and ready to explore.
                    </p>

                    <div className="flex flex-col align-middle bg-gray-100 border border-violet-500/20 rounded-xl p-6 mb-8">
                      <h4 className="font-medium mb-2">Website Details</h4>
                      <p className="text-gray-600 mb-1">
                        URL:{" "}
                        <span className="text-violet-400">
                          {websiteName}.websites.co.in
                        </span>
                      </p>
                      {/* <p className="text-gray-300">
                        Admin Panel:{" "}
                        <span className="text-violet-400">
                          yourwebsite.websites.co.in/admin
                        </span>
                      </p> */}
                    </div>

                    <div className="space-y-4 space-x-4">
                      <Button
                        onClick={nextStep}
                        className="w-fit rounded bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white"
                      >
                        Customize Your Website
                      </Button>

                      <Button
                        className="w-fit rounded  hover:border-black hover:bg-transparent hover:text-black text-white"
                        variant="outline"
                      >
                        Go to Your Website
                      </Button>

                      <Button
                        variant="outline"
                        className="w-fit rounded  hover:border-black hover:bg-transparent hover:text-black text-white"
                        onClick={prevStep}
                      >
                        Back to Details
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 4: Website Builder */}
        {step === 4 && (
          <div className="w-full min-h-screen flex flex-col">
            {/* Top Toolbar */}
            <div className="bg-gray-200 text-black  rounded  p-2 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold bg-clip-text text-transparent bg-black hidden md:block">
                    Websites.co.in
                  </h1>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-black border border-black rounded "
                  onClick={() => setStep(3)}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-black border border-black rounded "
                  onClick={() => setShowTemplates(true)}
                >
                  <Layout className="h-4 w-4 mr-1" />
                  Templates
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-black rounded"
                        onClick={() => setHistoryOpen(!historyOpen)}
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Undo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-black rounded"
                      >
                        <Redo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Redo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Separator orientation="vertical" className="h-6 bg-gray-400" />

                <div className="flex items-center bg-white rounded  p-1">
                  <Button
                    variant={editorMode === "desktop" ? "secondary" : "ghost"}
                    size="icon"
                    className={`h-7 w-7 ${
                      editorMode === "desktop"
                        ? "bg-gray-600 rounded"
                        : "text-gray-400 hover:text-white rounded "
                    }`}
                    onClick={() => setEditorMode("desktop")}
                  >
                    <Laptop className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={editorMode === "mobile" ? "secondary" : "ghost"}
                    size="icon"
                    className={`h-7 w-7 ${
                      editorMode === "mobile"
                        ? "bg-gray-600 rounded"
                        : "text-gray-400 hover:text-white rounded "
                    }`}
                    onClick={() => setEditorMode("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>

                <Separator
                  orientation="vertical"
                  className="h-6 bg-violet-500/20"
                />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`text-black rounded ${
                          showGrid ? "bg-violet-500/20 text-white" : ""
                        }`}
                        onClick={() => setShowGrid(!showGrid)}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle Grid</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`text-black rounded ${
                          showRulers ? "bg-violet-500/20 text-white" : ""
                        }`}
                        onClick={() => setShowRulers(!showRulers)}
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle Rulers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`text-black rounded ${
                          showLayerPanel ? "bg-violet-500/20 text-white" : ""
                        }`}
                        onClick={() => setShowLayerPanel(!showLayerPanel)}
                      >
                        <Layers className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle Layers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Separator
                  orientation="vertical"
                  className="h-6 bg-violet-500/20"
                />

                <Button
                  variant="outline"
                  size="sm"
                  className="border-violet-500/30 hover:bg-violet-500/10 rounded text-white"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded text-white"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Publish
                </Button>
              </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex">
              {/* Left Sidebar - Elements */}
              {showToolbox && (
                <div className="w-80 bg-gray-200    flex flex-col">
                  <Tabs
                    defaultValue="elements"
                    className="w-full"
                    onValueChange={setActiveTab}
                  >
                    <div className="px-2 pt-2">
                      <TabsList className="w-full bg-white rounded">
                        <TabsTrigger
                          value="elements"
                          className="flex-1 data-[state=active]:bg-gray-600 rounded"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Elements
                        </TabsTrigger>
                        <TabsTrigger
                          value="sections"
                          className="flex-1 data-[state=active]:bg-gray-600 rounded"
                        >
                          <Layout className="h-4 w-4 mr-1" />
                          Sections
                        </TabsTrigger>
                        <TabsTrigger
                          value="blocks"
                          className="flex-1 data-[state=active]:bg-gray-600 rounded"
                        >
                          <Bookmark className="h-4 w-4 mr-1" />
                          Blocks
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent
                      value="elements"
                      className="flex-1 p-2 space-y-1 mt-0"
                    >
                      <div className="text-xs text-gray-700 mb-2 px-2">
                        Drag elements to the canvas
                      </div>
                      <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-1 pr-3">
                          {elements.map((element) => (
                            <div
                              key={element.id}
                              className="flex text-gray-600 items-center gap-2 p-2 rounded  cursor-move border border-transparent hover:bg-gray-600 hover:text-white group"
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData("type", element.id);
                              }}
                            >
                              <div className="h-8 w-8 rounded-md  flex items-center justify-center  hover:text-white">
                                <element.icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm ">{element.name}</span>
                              <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-violet-500/10"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent
                      value="sections"
                      className="flex-1 p-2 space-y-1 mt-0"
                    >
                      <div className="text-xs text-gray-400 mb-2 px-2">
                        Drag sections to the canvas
                      </div>
                      <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-1 pr-3">
                          {sections.map((section) => (
                            <div
                              key={section.id}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500/10 cursor-move border border-transparent hover:border-violet-500/20 group"
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData("type", section.id);
                              }}
                            >
                              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/20 flex items-center justify-center text-white">
                                <section.icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm text-gray-300">
                                {section.name}
                              </span>
                              <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-violet-500/10"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent
                      value="blocks"
                      className="flex-1 p-2 space-y-1 mt-0"
                    >
                      <div className="text-xs text-gray-400 mb-2 px-2">
                        Your saved blocks
                      </div>
                      <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-1 pr-3">
                          {savedBlocks.map((block) => (
                            <div
                              key={block.id}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500/10 cursor-move border border-transparent hover:border-violet-500/20 group"
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData("type", block.id);
                              }}
                            >
                              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/20 flex items-center justify-center text-white">
                                <block.icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm text-gray-300">
                                {block.name}
                              </span>
                              <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-violet-500/10"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-violet-500/10"
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-4 border-violet-500/30 hover:bg-violet-500/10 text-white"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Save Current Selection
                          </Button>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-auto p-2 border-t border-violet-500/20">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-400 hover:text-white hover:bg-violet-500/10"
                      onClick={() => setShowToolbox(false)}
                    >
                      <PanelLeft className="h-4 w-4 mr-1" />
                      Hide Panel
                    </Button>
                  </div>
                </div>
              )}

              {/* Canvas Area */}
              <div className="flex-1 relative bg-gray-100 overflow-hidden flex">
                {!showToolbox && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 z-10 text-gray-400 hover:text-white hover:bg-violet-500/10"
                    onClick={() => setShowToolbox(true)}
                  >
                    <PanelRight className="h-4 w-4" />
                  </Button>
                )}

                {/* Rulers */}
                {showRulers && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-6 bg-black/30 border-b border-violet-500/20 z-10">
                      {/* Horizontal ruler markings */}
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={`h-${i}`}
                          className="absolute top-0 h-full border-l border-violet-500/30"
                          style={{ left: `${i * 50}px` }}
                        >
                          <span className="absolute top-1 left-1 text-[8px] text-gray-400">
                            {i * 50}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 left-0 w-6 h-full bg-black/30 border-r border-violet-500/20 z-10">
                      {/* Vertical ruler markings */}
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={`v-${i}`}
                          className="absolute left-0 w-full border-t border-violet-500/30"
                          style={{ top: `${i * 50}px` }}
                        >
                          <span className="absolute top-1 left-1 text-[8px] text-gray-400">
                            {i * 50}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 left-0 w-6 h-6 bg-black/50 border-r border-b border-violet-500/20 z-20"></div>
                  </>
                )}

                {/* Canvas Container with Fixed Dimensions */}
                <div
                  className={`
                  flex-1 
                  overflow-auto 
                  min-h-[calc(100vh-8rem)] 
                  p-8
                  ${showRulers ? "pt-16 pl-16" : ""}
                `}
                >
                  {/* Canvas Content */}
                  <div
                    ref={canvasRef}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    onClick={handleCanvasClick}
                    className={`
                      relative 
                      mx-auto 
                      bg-white/5 
                      border 
                      border-violet-500/10 
                      rounded-lg 
                      shadow-2xl 
                      transition-all 
                      duration-300
                      ${
                        editorMode === "mobile"
                          ? "w-[375px] min-h-[667px]"
                          : "w-[1200px] min-h-[800px]"
                      }
                      ${showGrid ? "backdrop-blur-sm" : ""}
                    `}
                    style={{
                      minWidth: editorMode === "mobile" ? "375px" : "1200px",
                      minHeight: editorMode === "mobile" ? "667px" : "800px",
                    }}
                  >
                    {/* Grid overlay */}
                    {showGrid && (
                      <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="w-full h-full grid grid-cols-12 gap-4">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-full border-l border-r border-violet-500/10"
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty state */}
                    {droppedElements.length === 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <Layout className="h-16 w-16 mb-4 opacity-20" />
                        <p className="text-lg font-medium mb-2">
                          Your canvas is empty
                        </p>
                        <p className="text-sm mb-6">
                          Drag elements from the sidebar to get started
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setShowTemplates(true)}
                          className="border-violet-500/30 hover:bg-violet-500/10 text-white"
                        >
                          <Layout className="h-4 w-4 mr-2" />
                          Choose a Template
                        </Button>
                      </div>
                    )}

                    {/* Render dropped elements */}
                    {droppedElements.map(renderElement)}

                    {/* Floating Add Toolbar */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-violet-900/90 to-blue-900/90 backdrop-blur-md border border-violet-500/30 rounded-full px-2 py-1 shadow-lg z-20">
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("type", "Text");
                                }}
                                draggable
                              >
                                <Type className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add Text</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("type", "Image");
                                }}
                                draggable
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add Image</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("type", "Button");
                                }}
                                draggable
                              >
                                <Square className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add Button</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Properties */}
              {selectedElement && (
                <div className="w-72 bg-gray-200 border-l text-gray-600 flex flex-col">
                  <div className="p-4 border-b border-violet-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Element Properties</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-600 hover:text-white hover:bg-violet-500/10"
                        onClick={() => setSelectedElement(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md flex items-center justify-center text-gray-600">
                        {(() => {
                          // Find the corresponding element, section, or block definition
                          const elementDef = elements.find(
                            (e) => e.id === selectedElement.type
                          );
                          const sectionDef = !elementDef
                            ? sections.find(
                                (s) => s.id === selectedElement.type
                              )
                            : null;
                          const blockDef =
                            !elementDef && !sectionDef
                              ? savedBlocks.find(
                                  (b) => b.id === selectedElement.type
                                )
                              : null;

                          // Return the appropriate icon
                          if (elementDef) {
                            const Icon = elementDef.icon;
                            return <Icon className="h-4 w-4" />;
                          } else if (sectionDef) {
                            const Icon = sectionDef.icon;
                            return <Icon className="h-4 w-4" />;
                          } else if (blockDef) {
                            const Icon = blockDef.icon;
                            return <Icon className="h-4 w-4" />;
                          } else {
                            return <Type className="h-4 w-4" />;
                          }
                        })()}
                      </div>
                      <span className="text-sm text-gray-600">
                        {(() => {
                          // Find the corresponding element, section, or block definition
                          const elementDef = elements.find(
                            (e) => e.id === selectedElement.type
                          );
                          const sectionDef = !elementDef
                            ? sections.find(
                                (s) => s.id === selectedElement.type
                              )
                            : null;
                          const blockDef =
                            !elementDef && !sectionDef
                              ? savedBlocks.find(
                                  (b) => b.id === selectedElement.type
                                )
                              : null;

                          // Return the name or type as fallback
                          return (
                            elementDef?.name ||
                            sectionDef?.name ||
                            blockDef?.name ||
                            selectedElement.type
                          );
                        })()}
                      </span>
                      <div className="ml-auto flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-600 hover:scale-110 hover:text-gray-600 hover:bg-transparent "
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-600 hover:scale-110 hover:text-gray-600 hover:bg-transparent"
                          onClick={() => {
                            // Remove the element from the canvas
                            setDroppedElements((elements) =>
                              elements.filter(
                                (el) => el.id !== selectedElement.id
                              )
                            );
                            setSelectedElement(null);
                          }}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Tabs
                    defaultValue="content"
                    className="flex-1"
                    onValueChange={setPropertyTab}
                  >
                    <div className="px-2 pt-4 ">
                      <TabsList className="w-full bg-white rounded p-2">
                        <TabsTrigger
                          value="content"
                          className="flex-1 data-[state=active]:bg-gray-600 rounded"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Content
                        </TabsTrigger>
                        <TabsTrigger
                          value="style"
                          className="flex-1 data-[state=active]:bg-gray-600 rounded"
                        >
                          <Palette className="h-4 w-4 mr-1" />
                          Style
                        </TabsTrigger>
                        <TabsTrigger
                          value="advanced"
                          className="flex-1 data-[state=active]:bg-gray-600 rounded"
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Advanced
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent
                      value="content"
                      className="flex-1 p-4 space-y-4 mt-0"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="headingText" className="text-gray-600">
                          Text
                        </Label>
                        <Input
                          id="headingText"
                          value={selectedElement?.text || ""}
                          onChange={(e) =>
                            updateElementProperty("text", e.target.value)
                          }
                          className="bg-white text-gray-600 border-none   rounded"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-600">Text Alignment</Label>
                        <div className="flex bg-white rounded p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`flex-1 h-8 ${
                              selectedElement?.textAlignment === "left"
                                ? "bg-gray-600 text-white rounded"
                                : "text-gray-600 rounded"
                            }`}
                            onClick={() =>
                              updateElementProperty("textAlignment", "left")
                            }
                          >
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`flex-1 h-8 ${
                              selectedElement?.textAlignment === "center"
                                ? "bg-gray-600 text-white rounded"
                                : "text-gray-600 rounded"
                            }`}
                            onClick={() =>
                              updateElementProperty("textAlignment", "center")
                            }
                          >
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`flex-1 h-8 ${
                              selectedElement?.textAlignment === "right"
                                ? "bg-gray-600 text-white rounded"
                                : "text-gray-600 rounded"
                            }`}
                            onClick={() =>
                              updateElementProperty("textAlignment", "right")
                            }
                          >
                            <AlignRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-600">Text Style</Label>
                        <div className="flex bg-white rounded p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`flex-1 h-8 ${
                              selectedElement?.isBold
                                ? "bg-gray-600 text-white rounded"
                                : "text-gray-400 rounded"
                            }`}
                            onClick={() =>
                              updateElementProperty(
                                "isBold",
                                !selectedElement?.isBold
                              )
                            }
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`flex-1 h-8 ${
                              selectedElement?.isItalic
                                ? "bg-gray-600 text-white rounded"
                                : "text-gray-400 rounded"
                            }`}
                            onClick={() =>
                              updateElementProperty(
                                "isItalic",
                                !selectedElement?.isItalic
                              )
                            }
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`flex-1 h-8 ${
                              selectedElement?.isUnderlined
                                ? "bg-gray-600 text-white rounded"
                                : "text-gray-400 rounded"
                            }`}
                            onClick={() =>
                              updateElementProperty(
                                "isUnderlined",
                                !selectedElement?.isUnderlined
                              )
                            }
                          >
                            <Underline className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="style"
                      className="flex-1 p-4 space-y-4 mt-0 overflow-y-auto h-[calc(100vh-16rem)]"
                    >
                      <div className="space-y-4">
                        {/* Font Size */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="fontSize" className="text-gray-300">
                              Font Size
                            </Label>
                            <span className="text-xs text-gray-400">
                              {selectedElement?.fontSize}px
                            </span>
                          </div>
                          <Slider
                            id="fontSize"
                            value={[selectedElement?.fontSize || 16]}
                            onValueChange={(value) =>
                              updateElementProperty("fontSize", value[0])
                            }
                            max={72}
                            min={8}
                            step={1}
                            className="py-2"
                          />
                        </div>

                        {/* Text Color */}
                        <div className="space-y-2">
                          <Label htmlFor="textColor" className="text-gray-300">
                            Text Color
                          </Label>
                          <div className="flex gap-2">
                            <div
                              className="h-8 w-8 rounded-md border border-white/20 cursor-pointer"
                              style={{
                                backgroundColor: selectedElement?.color,
                              }}
                              onClick={() => {
                                // Simple color rotation for demo purposes
                                const colors = [
                                  "#8B5CF6",
                                  "#1e40af",
                                  "#ef4444",
                                  "#22c55e",
                                  "#f59e0b",
                                  "#ffffff",
                                  "#000000",
                                ];
                                const currentIndex = colors.indexOf(
                                  selectedElement?.color || ""
                                );
                                const nextIndex =
                                  (currentIndex + 1) % colors.length;
                                updateElementProperty(
                                  "color",
                                  colors[nextIndex]
                                );
                              }}
                            ></div>
                            <Input
                              id="textColor"
                              value={selectedElement?.color || ""}
                              onChange={(e) =>
                                updateElementProperty("color", e.target.value)
                              }
                              className="flex-1 bg-transparent text-black  rounded"
                            />
                          </div>
                        </div>

                        {/* Background Color */}
                        <div className="space-y-2">
                          <Label htmlFor="bgColor" className="text-gray-300">
                            Background Color
                          </Label>
                          <div className="flex gap-2">
                            <div
                              className="h-8 w-8 rounded-md border border-white/20 cursor-pointer"
                              style={{
                                backgroundColor:
                                  selectedElement?.backgroundColor,
                              }}
                              onClick={() => {
                                // Simple color rotation for demo purposes
                                const colors = [
                                  "#dbeafe",
                                  "#f3e8ff",
                                  "#dcfce7",
                                  "#fef3c7",
                                  "#fee2e2",
                                  "#2563eb",
                                  "transparent",
                                ];
                                const currentIndex = colors.indexOf(
                                  selectedElement?.backgroundColor || ""
                                );
                                const nextIndex =
                                  (currentIndex + 1) % colors.length;
                                updateElementProperty(
                                  "backgroundColor",
                                  colors[nextIndex]
                                );
                              }}
                            ></div>
                            <Input
                              id="bgColor"
                              value={selectedElement?.backgroundColor || ""}
                              onChange={(e) =>
                                updateElementProperty(
                                  "backgroundColor",
                                  e.target.value
                                )
                              }
                              className="flex-1 bg-transparent text-black  rounded"
                            />
                          </div>
                        </div>

                        {/* Opacity */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="opacity" className="text-gray-300">
                              Opacity
                            </Label>
                            <span className="text-xs text-gray-400">
                              {selectedElement?.opacity}%
                            </span>
                          </div>
                          <Slider
                            id="opacity"
                            value={[selectedElement?.opacity || 100]}
                            onValueChange={(value) =>
                              updateElementProperty("opacity", value[0])
                            }
                            max={100}
                            min={10}
                            step={1}
                            className="py-2"
                          />
                        </div>

                        {/* Padding */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="padding" className="text-gray-300">
                              Padding
                            </Label>
                            <span className="text-xs text-gray-400">
                              {selectedElement?.padding}px
                            </span>
                          </div>
                          <Slider
                            id="padding"
                            value={[selectedElement?.padding || 8]}
                            onValueChange={(value) =>
                              updateElementProperty("padding", value[0])
                            }
                            max={40}
                            min={0}
                            step={1}
                            className="py-2"
                          />
                        </div>

                        {/* Border */}
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Border
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label
                                htmlFor="borderWidth"
                                className="text-xs text-gray-400"
                              >
                                Width
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  id="borderWidth"
                                  type="number"
                                  value={selectedElement?.borderWidth || 0}
                                  onChange={(e) =>
                                    updateElementProperty(
                                      "borderWidth",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="flex-1 h-8 bg-transparent text-black  rounded"
                                />
                                <span className="ml-1 text-xs text-gray-400">
                                  px
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor="borderRadius"
                                className="text-xs text-gray-400"
                              >
                                Radius
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  id="borderRadius"
                                  type="number"
                                  value={selectedElement?.borderRadius || 4}
                                  onChange={(e) =>
                                    updateElementProperty(
                                      "borderRadius",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="flex-1 h-8 bg-transparent text-black  rounded"
                                />
                                <span className="ml-1 text-xs text-gray-400">
                                  px
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Label
                              htmlFor="borderColor"
                              className="text-xs text-gray-400"
                            >
                              Color
                            </Label>
                            <div className="flex gap-2 mt-1">
                              <div
                                className="h-8 w-8 rounded-md border border-white/20 cursor-pointer"
                                style={{
                                  backgroundColor: selectedElement?.borderColor,
                                }}
                                onClick={() => {
                                  // Simple color rotation for demo purposes
                                  const colors = [
                                    "#d4d4d8",
                                    "#8B5CF6",
                                    "#1e40af",
                                    "#ef4444",
                                    "#22c55e",
                                    "#f59e0b",
                                  ];
                                  const currentIndex = colors.indexOf(
                                    selectedElement?.borderColor || ""
                                  );
                                  const nextIndex =
                                    (currentIndex + 1) % colors.length;
                                  updateElementProperty(
                                    "borderColor",
                                    colors[nextIndex]
                                  );
                                }}
                              ></div>
                              <Input
                                id="borderColor"
                                value={selectedElement?.borderColor || ""}
                                onChange={(e) =>
                                  updateElementProperty(
                                    "borderColor",
                                    e.target.value
                                  )
                                }
                                className="flex-1 bg-transparent text-black  rounded"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dimensions */}
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Size
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label
                                htmlFor="elementWidth"
                                className="text-xs text-gray-400"
                              >
                                Width
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  id="elementWidth"
                                  type="number"
                                  value={
                                    selectedElement?.width === 0
                                      ? ""
                                      : selectedElement?.width
                                  }
                                  placeholder="Auto"
                                  onChange={(e) =>
                                    updateElementProperty(
                                      "width",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="flex-1 h-8 bg-transparent text-black  rounded"
                                />
                                <span className="ml-1 text-xs text-gray-400">
                                  px
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor="elementHeight"
                                className="text-xs text-gray-400"
                              >
                                Height
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  id="elementHeight"
                                  type="number"
                                  value={
                                    selectedElement?.height === 0
                                      ? ""
                                      : selectedElement?.height
                                  }
                                  placeholder="Auto"
                                  onChange={(e) =>
                                    updateElementProperty(
                                      "height",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="flex-1 h-8 bg-transparent text-black  rounded"
                                />
                                <span className="ml-1 text-xs text-gray-400">
                                  px
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="advanced"
                      className="flex-1 p-4 space-y-4 mt-0"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="elementId" className="text-gray-300">
                          Element ID
                        </Label>
                        <Input
                          id="elementId"
                          placeholder="heading-1"
                          className="bg-transparent text-black  rounded"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="elementClass" className="text-gray-300">
                          CSS Classes
                        </Label>
                        <Input
                          id="elementClass"
                          placeholder="main-heading hero-text"
                          className="bg-transparent text-black  rounded"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="visibility" className="text-gray-300">
                            Visibility
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              Hide on Mobile
                            </span>
                            <Switch id="visibility" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customCSS" className="text-gray-300">
                          Custom CSS
                        </Label>
                        <textarea
                          id="customCSS"
                          rows={4}
                          placeholder="Enter custom CSS..."
                          className="w-full rounded-md bg-black/50 border border-violet-500/30 focus:border-violet-500 text-white p-2 text-sm"
                        ></textarea>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="animations" className="text-gray-300">
                          Animations
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-transparent text-black  rounded">
                            <SelectValue placeholder="Select animation" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border border-violet-500/30">
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="fade">Fade In</SelectItem>
                            <SelectItem value="slide">Slide Up</SelectItem>
                            <SelectItem value="zoom">Zoom In</SelectItem>
                            <SelectItem value="bounce">Bounce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Layers Panel */}
              {showLayerPanel && (
                <div className="w-64 bg-gradient-to-b from-violet-900/20 to-blue-900/20 backdrop-blur-md border-l border-violet-500/20 flex flex-col">
                  <div className="p-4 border-b border-violet-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Layers</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-white hover:bg-violet-500/10"
                        onClick={() => setShowLayerPanel(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* History Panel */}
              {historyOpen && (
                <div className="absolute top-16 right-4 w-64 bg-gradient-to-b from-violet-900/90 to-blue-900/90 backdrop-blur-md border border-violet-500/20 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-violet-500/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">History</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-white hover:bg-violet-500/10"
                        onClick={() => setHistoryOpen(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 max-h-64 overflow-auto">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500/10 cursor-pointer text-sm"
                      >
                        <div className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center text-white">
                          <Undo className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-gray-300">{item.action}</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Templates Modal */}
        {showTemplates && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4">
            <div className="bg-white backdrop-blur-md border border-violet-500/20 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="p-4 border-b border-violet-500/20 flex items-center justify-between">
                <h2 className="text-xl text-gray-600 font-bold">
                  Choose a Template
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-white hover:bg-violet-500/10"
                  onClick={() => setShowTemplates(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 border-b border-violet-500/20">
                <div className="flex gap-2">
                  <Button
                    variant={templateCategory === "all" ? "secondary" : "ghost"}
                    size="sm"
                    className={
                      templateCategory === "all"
                        ? "bg-gray-600 text-white rounded"
                        : "text-gray-600 hover:text-white "
                    }
                    onClick={() => setTemplateCategory("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={
                      templateCategory === "business" ? "secondary" : "ghost"
                    }
                    size="sm"
                    className={
                      templateCategory === "business"
                        ? "bg-gray-600 text-white rounded"
                        : "text-gray-600 hover:text-white "
                    }
                    onClick={() => setTemplateCategory("business")}
                  >
                    Business
                  </Button>
                  <Button
                    variant={
                      templateCategory === "portfolio" ? "secondary" : "ghost"
                    }
                    size="sm"
                    className={
                      templateCategory === "portfolio"
                        ? "bg-gray-600 text-white rounded"
                        : "text-gray-600 hover:text-white "
                    }
                    onClick={() => setTemplateCategory("portfolio")}
                  >
                    Portfolio
                  </Button>
                  <Button
                    variant={
                      templateCategory === "ecommerce" ? "secondary" : "ghost"
                    }
                    size="sm"
                    className={
                      templateCategory === "ecommerce"
                        ? "bg-gray-600 text-white rounded"
                        : "text-gray-600 hover:text-white "
                    }
                    onClick={() => setTemplateCategory("ecommerce")}
                  >
                    E-Commerce
                  </Button>
                  <Button
                    variant={
                      templateCategory === "blog" ? "secondary" : "ghost"
                    }
                    size="sm"
                    className={
                      templateCategory === "blog"
                        ? "bg-gray-600 text-white rounded"
                        : "text-gray-600 hover:text-white "
                    }
                    onClick={() => setTemplateCategory("blog")}
                  >
                    Blog
                  </Button>
                </div>
              </div>

              <ScrollArea className="p-4 max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="bg-black/30 border-violet-500/20 overflow-hidden group"
                    >
                      <div className="relative">
                        <img
                          src={template.image || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute rounded inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/30 text-white rounded hover:bg-white/10"
                            >
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r rounded from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white"
                              onClick={() => {
                                setShowTemplates(false);
                                setStep(4);
                              }}
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-black text-sm">
                            {template.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-[10px] h-4 border-gray-600 text-black"
                          >
                            {template.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

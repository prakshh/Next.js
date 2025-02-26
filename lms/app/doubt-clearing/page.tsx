"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ThumbsUp, MessageSquare, Paperclip, CheckCircle, Filter, Search, Plus, Clock, CheckCircle2 } from "lucide-react";

// Mock data for doubts
const initialDoubts = [
  {
    id: 1,
    title: "How do I implement a binary search tree in JavaScript?",
    content: "I'm struggling with implementing a binary search tree in JavaScript. Can someone explain the insertion and deletion operations with code examples?",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    },
    timestamp: "2 hours ago",
    subject: "Data Structures",
    upvotes: 5,
    replies: [
      {
        id: 101,
        content: "Here's a basic implementation of a BST node in JavaScript:\n```javascript\nclass Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n```\nFor insertion, you compare the new value with the current node and decide whether to go left or right. I'll share more detailed code if needed.",
        author: {
          name: "Dr. Sarah Miller",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
          isTutor: true
        },
        timestamp: "1 hour ago",
        upvotes: 3,
      }
    ],
    status: "open",
    attachments: 0,
  },
  {
    id: 2,
    title: "Understanding React useEffect cleanup function",
    content: "I'm confused about when to use the cleanup function in useEffect. Can someone explain with practical examples when it's necessary?",
    author: {
      name: "Jamie Smith",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    },
    timestamp: "1 day ago",
    subject: "React",
    upvotes: 12,
    replies: [
      {
        id: 201,
        content: "The cleanup function is important when your effect creates resources that need to be cleaned up before the component unmounts. Common examples include:\n\n1. Clearing timers (clearTimeout, clearInterval)\n2. Removing event listeners\n3. Canceling network requests\n4. Cleaning up subscriptions\n\nHere's an example with an event listener:",
        author: {
          name: "Prof. Michael Chen",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
          isTutor: true
        },
        timestamp: "20 hours ago",
        upvotes: 8,
      },
      {
        id: 202,
        content: "To add to Prof. Chen's explanation, here's a practical example:\n\n```jsx\nuseEffect(() => {\n  const handleResize = () => {\n    console.log('Window resized');\n  };\n  \n  window.addEventListener('resize', handleResize);\n  \n  // Cleanup function\n  return () => {\n    window.removeEventListener('resize', handleResize);\n  };\n}, []);\n```\n\nWithout the cleanup, you'd create a new event listener every time the component re-renders, causing memory leaks.",
        author: {
          name: "Lisa Wong",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
          isTutor: true
        },
        timestamp: "18 hours ago",
        upvotes: 5,
      }
    ],
    status: "resolved",
    attachments: 1,
  },
  {
    id: 3,
    title: "Difference between SQL and NoSQL databases",
    content: "Can someone explain the key differences between SQL and NoSQL databases? When should I choose one over the other for my projects?",
    author: {
      name: "Taylor Reed",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    },
    timestamp: "3 days ago",
    subject: "Databases",
    upvotes: 18,
    replies: [],
    status: "open",
    attachments: 0,
  }
];

export default function DoubtClearingPage() {
  const [doubts, setDoubts] = useState(initialDoubts);
  const [newDoubtTitle, setNewDoubtTitle] = useState("");
  const [newDoubtContent, setNewDoubtContent] = useState("");
  const [newReplyContent, setNewReplyContent] = useState("");
  const [activeDoubtId, setActiveDoubtId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter doubts based on search query and active tab
  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doubt.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "open") return matchesSearch && doubt.status === "open";
    if (activeTab === "resolved") return matchesSearch && doubt.status === "resolved";
    
    return matchesSearch;
  });

  const handleUpvote = (doubtId: number) => {
    setDoubts(prevDoubts => 
      prevDoubts.map(doubt => 
        doubt.id === doubtId ? { ...doubt, upvotes: doubt.upvotes + 1 } : doubt
      )
    );
  };

  const handleReplyUpvote = (doubtId: number, replyId: number) => {
    setDoubts(prevDoubts => 
      prevDoubts.map(doubt => 
        doubt.id === doubtId ? {
          ...doubt,
          replies: doubt.replies.map(reply => 
            reply.id === replyId ? { ...reply, upvotes: reply.upvotes + 1 } : reply
          )
        } : doubt
      )
    );
  };

  const handleMarkAsResolved = (doubtId: number) => {
    setDoubts(prevDoubts => 
      prevDoubts.map(doubt => 
        doubt.id === doubtId ? { ...doubt, status: "resolved" } : doubt
      )
    );
  };

  const handleAddReply = (doubtId: number) => {
    if (!newReplyContent.trim()) return;
    
    const newReply = {
      id: Date.now(),
      content: newReplyContent,
      author: {
        name: "You (Tutor)",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
        isTutor: true
      },
      timestamp: "Just now",
      upvotes: 0
    };
    
    setDoubts(prevDoubts => 
      prevDoubts.map(doubt => 
        doubt.id === doubtId ? {
          ...doubt,
          replies: [...doubt.replies, newReply]
        } : doubt
      )
    );
    
    setNewReplyContent("");
    setActiveDoubtId(null);
  };

  const handleAddDoubt = () => {
    if (!newDoubtTitle.trim() || !newDoubtContent.trim()) return;
    
    const newDoubt = {
      id: Date.now(),
      title: newDoubtTitle,
      content: newDoubtContent,
      author: {
        name: "You (Student)",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      },
      timestamp: "Just now",
      subject: "General",
      upvotes: 0,
      replies: [],
      status: "open",
      attachments: 0,
    };
    
    setDoubts([newDoubt, ...prevDoubts]);
    setNewDoubtTitle("");
    setNewDoubtContent("");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Doubt Clearing Forum</h1>
          <p className="text-muted-foreground mt-1">Ask questions, get answers, and help others learn</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                <span>Ask a Question</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Post a New Question</DialogTitle>
                <DialogDescription>
                  Be specific and provide details to get better answers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Question Title</label>
                  <Input
                    id="title"
                    placeholder="e.g., How do I implement authentication in Next.js?"
                    value={newDoubtTitle}
                    onChange={(e) => setNewDoubtTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="content" className="text-sm font-medium">Details</label>
                  <Textarea
                    id="content"
                    placeholder="Describe your question in detail..."
                    className="min-h-[150px]"
                    value={newDoubtContent}
                    onChange={(e) => setNewDoubtContent(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Paperclip size={14} />
                    <span>Attach Files</span>
                  </Button>
                  <span className="text-xs text-muted-foreground">Supported: PDF, PNG, JPG (max 5MB)</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setNewDoubtTitle("");
                  setNewDoubtContent("");
                }}>Cancel</Button>
                <Button onClick={handleAddDoubt}>Post Question</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="all">All Questions</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDoubts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No questions found. Try a different search or post a new question.</p>
                </CardContent>
              </Card>
            ) : (
              filteredDoubts.map(doubt => (
                <Card key={doubt.id} className={doubt.status === "resolved" ? "border-green-200" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={doubt.author.avatar} alt={doubt.author.name} />
                          <AvatarFallback>{doubt.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{doubt.author.name}</span>
                        <span className="text-xs text-muted-foreground">• {doubt.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {doubt.subject}
                        </Badge>
                        {doubt.status === "resolved" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Resolved
                          </Badge>
                        )}
                        {doubt.status === "open" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            <Clock className="mr-1 h-3 w-3" />
                            Open
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{doubt.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{doubt.content}</p>
                    
                    {doubt.replies.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Replies ({doubt.replies.length})</span>
                        </div>
                        <ScrollArea className="h-[200px] rounded-md border p-4">
                          <div className="space-y-4">
                            {doubt.replies.map(reply => (
                              <div key={reply.id} className="relative pl-4 border-l-2 border-muted">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                      <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{reply.author.name}</span>
                                    {reply.author.isTutor && (
                                      <Badge variant="secondary" className="text-xs">Tutor</Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground">• {reply.timestamp}</span>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm whitespace-pre-line">{reply.content}</div>
                                <div className="mt-2 flex items-center gap-4">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 px-2 text-xs"
                                    onClick={() => handleReplyUpvote(doubt.id, reply.id)}
                                  >
                                    <ThumbsUp className="mr-1 h-3 w-3" />
                                    Helpful ({reply.upvotes})
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleUpvote(doubt.id)}
                      >
                        <ThumbsUp className="mr-1 h-3 w-3" />
                        Upvote ({doubt.upvotes})
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => setActiveDoubtId(activeDoubtId === doubt.id ? null : doubt.id)}
                      >
                        <MessageSquare className="mr-1 h-3 w-3" />
                        Reply
                      </Button>
                      {doubt.attachments > 0 && (
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Paperclip className="mr-1 h-3 w-3" />
                          Attachments ({doubt.attachments})
                        </Button>
                      )}
                    </div>
                    {doubt.status === "open" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleMarkAsResolved(doubt.id)}
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Mark as Resolved
                      </Button>
                    )}
                  </CardFooter>
                  
                  {activeDoubtId === doubt.id && (
                    <div className="px-6 pb-4">
                      <Separator className="mb-4" />
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Write your reply..."
                          className="min-h-[100px]"
                          value={newReplyContent}
                          onChange={(e) => setNewReplyContent(e.target.value)}
                        />
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Paperclip size={14} />
                            <span>Attach</span>
                          </Button>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setNewReplyContent("");
                                setActiveDoubtId(null);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleAddReply(doubt.id)}
                            >
                              Post Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Overview of forum activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Questions</span>
                  <span className="font-medium">{doubts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Open Questions</span>
                  <span className="font-medium">{doubts.filter(d => d.status === "open").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolved Questions</span>
                  <span className="font-medium">{doubts.filter(d => d.status === "resolved").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Your Contributions</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Most discussed subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer">React</Badge>
                <Badge variant="secondary" className="cursor-pointer">JavaScript</Badge>
                <Badge variant="secondary" className="cursor-pointer">Data Structures</Badge>
                <Badge variant="secondary" className="cursor-pointer">Algorithms</Badge>
                <Badge variant="secondary" className="cursor-pointer">Databases</Badge>
                <Badge variant="secondary" className="cursor-pointer">Next.js</Badge>
                <Badge variant="secondary" className="cursor-pointer">CSS</Badge>
                <Badge variant="secondary" className="cursor-pointer">Python</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Most helpful community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Dr. Sarah Miller</p>
                    <p className="text-xs text-muted-foreground">42 helpful answers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Prof. Michael Chen</p>
                    <p className="text-xs text-muted-foreground">38 helpful answers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" />
                    <AvatarFallback>LW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Lisa Wong</p>
                    <p className="text-xs text-muted-foreground">27 helpful answers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
              <CardDescription>Tips for effective communication</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Be specific in your questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Include relevant code snippets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Be respectful and patient</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Upvote helpful answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Mark your question as resolved when answered</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
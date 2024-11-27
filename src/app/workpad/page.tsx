import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Workpad() {
    return (
        <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
            <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
                {/* Left sidebar & main wrapper */}
                <div className='flex-1 xl:flex'>
                <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                    {/* Main area */}
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Case Workpad</h2>
                    </div>
                    <Card className="pt-6">
                        <CardHeader>
                            <CardTitle>Case Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                                <div className="space-y-1 p-2">
                                    <p className="text-sm font-medium leading-none">Case #</p>
                                    <p className="text-sm text-muted-foreground">
                                    123456
                                    </p>
                                </div>

                                <div className="space-y-1 p-2">
                                    <p className="text-sm font-medium leading-none">Reported</p>
                                    <p className="text-sm text-muted-foreground">
                                    Wednesday 12PM.
                                    </p>
                                </div>

                                <div className="space-y-1 p-2">
                                    <p className="text-sm font-medium leading-none">Status</p>
                                    <p className="text-sm text-muted-foreground">
                                    Open
                                    </p>
                                </div>

                                <div className="space-y-1 p-2">
                                    <p className="text-sm font-medium leading-none">Description</p>
                                    <p className="text-sm text-muted-foreground">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                                    </p>
                                </div>

                                <div className="p-2">
                                <Textarea placeholder="Add officer notes here .." /> 
                                </div>
                        </CardContent>

                    </Card>

                    <Tabs defaultValue="similar-cases" className="pt-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="similar-cases">Similar Cases</TabsTrigger>
                            <TabsTrigger value="supporting-docs">Supporting Documents</TabsTrigger>
                        </TabsList>
                        <TabsContent value="similar-cases">
                            <p>similar cases here - list?</p>
                        </TabsContent>
                        <TabsContent value="supporting-docs">
                            <p>supporting documentation here - list?</p>
                        </TabsContent>
                    </Tabs>
                </div>
                </div>

                <div className='shrink-0 flex-[0.5] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
                    <p>chat bot side</p>
                </div>
            </div>
        </div>
    )
}  

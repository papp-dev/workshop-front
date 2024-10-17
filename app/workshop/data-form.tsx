"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as backendService from "@/lib/backend-service";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos dois caracteres",
  }),
  weight: z.coerce.number().nonnegative({
    message: "Peso não pode ser um número negativo",
  }),
  height: z.coerce.number().nonnegative({
    message: "Altura não pode ser um número negativo",
  }),
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function DataForm({ setPeopleState }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      weight: 0,
      height: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    backendService
      .createPerson({
        name: data.name,
        height: data.height,
        weight: data.weight,
      })
      .then(() => {
        backendService.listPeople().then((r) => setPeopleState(r));
      });
    toast({
      title: "Você submeteu os seguintes dados:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Paulo" {...field} />
              </FormControl>
              <FormDescription>nome</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso</FormLabel>
              <FormControl>
                <Input type="number" placeholder="65" {...field} />
              </FormControl>
              <FormDescription>peso em kilos</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1.75" {...field} />
              </FormControl>
              <FormDescription>altura em metros</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Criar</Button>
      </form>
    </Form>
  );
}
